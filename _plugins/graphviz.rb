module Jekyll
  class GraphVizTag < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @@visNum ||= 0
      @@visNum += 1
      @markup = markup
    end

    def render(context)
      IO.popen("echo '#{@nodelist[0]}' | dot -Tpng -o'_site/images/gv-#{@@visNum}.png'") 
      "<img src='/images/gv-#{@@visNum}.png' />"
    end
  end
end

Liquid::Template.register_tag('graphviz', Jekyll::GraphVizTag)
