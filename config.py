import ConfigParser


configParser = ConfigParser.RawConfigParser()
configFilePath = r'D:\config.cfg'
configParser.read(configFilePath)
SERVER = configParser.get('global', 'server')
MAILNODES = dict()
for name, value in configParser.items("ExternalMailnodeMap"):
    MAILNODES[name] = value

# SERVERS = ['test12']
# USER = ''
# PASSWORD = ''
