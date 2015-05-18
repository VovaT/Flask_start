import ConfigParser


configParser = ConfigParser.RawConfigParser()
configFilePath = r'D:\config.cfg'
configParser.read(configFilePath)
SERVER = configParser.get('global', 'server')

# SERVERS = ['test12']
# USER = ''
# PASSWORD = ''
