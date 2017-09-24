require 'html-proofer'
require 'tempfile'
require 'yaml'
require 'after_the_deadline'
require 'jekyll'
require 'retriable'

class Spellcheck < ::HTMLProofer::Check
  @@config = YAML.load_file('word-whitelist.yaml')

  def run
    @html.css('p, li, h1, h2, h3, h4, th, td, dl, figcaption').each do |node|
      @link = create_element(node)
      line_number = node.line
      file = Tempfile.new('line')
      file.write(node.text)
      file.close

      `hunspell -a #{file.path} 2>&1`.each_line do |line|
        line = line.strip
        if line.starts_with? "error"
          next
        end
        if line.length > 0 && line[0] != '*' && line[0] != '@' then
          line = line[2..-1]
          bad_word = line.split(" ")[0]
          suggestions = line.split(":")[1]
          if @@config["ignore"].include? bad_word
            next
          end
          good = false
          @@config["by-file"].each do |site, words|
            if /#{site}/.match? @path
              if words.include? bad_word
                good = true
              end
            end
          end
          if !good
            add_issue("#{bad_word} misspelled. Perhaps you meant: #{suggestions}", line: line_number)
          end
        end
      end
    end
  end
end

class GrammarCheck < ::HTMLProofer::Check
  @@client = AfterTheDeadline.client(api_key: "shoot21380db0f9715b58bd70ebf9e1afff15", ignore_types: [])
  def run
    text = ""
    @html.css('p, li, h1, h2, h3, h4, th, td, dl, figcaption').each do |node|
      @link = create_element(node)
      str = node.text
      str.gsub!(/[”“]/, '"')
      str.gsub!(/[‘’]/, "'")
      text.concat(str).concat("\n")
    end
    errors = []
    Retriable.retriable tries: 15 do
      errors = @@client.check text, action: "checkGrammar"
    end
    errors.each do |error|
      if error.description != "Spelling"
        message = "#{error.description}: `#{error.precontext} [#{error.string}]`"
        if error.suggestions.length > 0
          add_issue("#{message} suggestions: #{error.suggestions.join(", ")}")
        else
          add_issue(message)
        end
      end
    end
  end
end

HTMLProofer.check_directory('_site', {
  :only_4xx => true,
  :check_favicon => true,
  :check_html => true,
}).run
