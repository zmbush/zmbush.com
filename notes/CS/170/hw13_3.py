f = open('hw13_3.seed')
out = open('hw13_3.txt', 'w')
for line in f:
  login = 'cs170-' + line[:2]
  collaborator = line[3:].strip()
  num = raw_input('How often did you collaborate with %s? ' % collaborator)
  print >> out, "%s %s" % (login, num)
