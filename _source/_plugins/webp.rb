Jekyll::Hooks.register :site, :post_write do |site|
  if ENV["JEKYLL_ENV"] == "production" then
    print "Compiling webp"
    Dir[site.dest + "/assets/*.jpg"].each do |jpeg|
      print '.'
      $stdout.flush
      `cwebp #{jpeg} -q 80 -o #{jpeg}.webp 2>&1`
    end

    Dir[site.dest + "/assets/*.png"].each do |png|
      print '.'
      $stdout.flush
      `cwebp #{png} -q 80 -o #{png}.webp 2>&1`
    end
    puts
  end
end
