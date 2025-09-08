-- Resource Metadata
fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Paradoxtended'
description 'An advanced heist contracts resource.'
version '1.0.0'

dependency {
    'paradox_bridge'
}

files {
    'locales/*.json',
    'web/dist/**/*',
    'config/data/*.lua'
}

ui_page 'web/dist/index.html'

shared_scripts {
    '@ox_lib/init.lua',
    'init.lua',
    'config/config.lua'
}

client_scripts {
    '@paradox_bridge/framework/esx/client.lua',
    '@paradox_bridge/framework/qb/client.lua',
    'config/cl_edit.lua',
    'client/utils.lua'
}

server_scripts {
    '@paradox_bridge/framework/esx/server.lua',
    '@paradox_bridge/framework/qb/server.lua',
}

dependency '/assetpacks'