module Jekyll
  class Site
    def process
      self.reset
      self.read
      self.cleanup
      self.generate
      self.render
      self.write
    end
  end
end
