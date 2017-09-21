site = File.dirname(__FILE__) + "/.."
puts %x(fontcustom compile #{site}/_font -c #{site}/_font/fontcustom.yml -F)
