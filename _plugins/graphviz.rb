module Jekyll
  class GraphVizTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @@visNum ||= 0
      @@visNum += 1
      @markup = markup
      params = @markup.split(" ")
      @name = nil
      if params.length > 0
        @name = params[0]
      end
      @algorithm = "dot"
      if params.length > 1
        @algorithm = params[1]
      end
    end

    def render(context)
      fname = "gv-#{@@visNum}.png"
      if ! @name.nil?
        fname = "#{@name}.png"
      end
      IO.popen("echo '#{@nodelist[0]}' | #{@algorithm} -Tpng -o'_site/images/#{fname}'") 
      "<img src='/images/#{fname}' />"
    end
  end
end

Liquid::Template.register_tag('graphviz', Jekyll::GraphVizTag)
