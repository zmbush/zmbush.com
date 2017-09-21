module Jekyll
  class FaviconGenerator < Jekyll::Generator
    def generate(site)
      Dir[site.source + "/_favicons/*"].each do |favicon_file|
        site.static_files << Jekyll::StaticFile.new(
          site,
          site.source + "/_favicons",
          "/",
          File.basename(favicon_file)
        )
      end
    end
  end
end
