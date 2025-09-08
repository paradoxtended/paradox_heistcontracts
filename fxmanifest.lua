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
    '@prp_lib/resource/callbacks/client/qb.lua',
    '@prp_lib/resource/callbacks/client/esx.lua',
    'config/cl_edit.lua',
}

server_scripts {
    '@prp_lib/resource/callbacks/server/qb.lua',
    '@prp_lib/resource/callbacks/server/esx.lua',
}