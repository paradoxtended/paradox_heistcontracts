-- Resource Metadata
fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Paradoxtended'
description 'An advanced heist contracts resource.'
version '1.0.0'

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
    'utils/cl_main.lua',
    'config/cl_edit.lua'
}

server_scripts {
    'utils/sv_main.lua'
}