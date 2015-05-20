import ConfigParser


configParser = ConfigParser.RawConfigParser()
configFilePath = r'D:\config.cfg'
configParser.read(configFilePath)
SERVER = configParser.get('global', 'server')
PROTOCOL = 'http://'

# SERVERS = ['test12']
# USER = ''
# PASSWORD = ''
