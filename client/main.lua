lib.locale()

local Blackmarket = require 'config.data.blackmarket'

local object

local function deleteObject()
    if object then
        ClearPedTasks(cache.ped)
        Wait(300)
        DeleteEntity(object)

        object = nil
    end
end

local function createObject()
    local model = `prop_cs_tablet`
    local animDict = 'amb@code_human_in_bus_passenger_idles@female@tablet@base'

    lib.requestModel(model)
    lib.requestAnimDict(animDict)

    local coords = GetEntityCoords(cache.ped)
    object = CreateObject(model, coords.x, coords.y, coords.z, true, true, false)
    local boneIndex = GetPedBoneIndex(cache.ped, 60309)

    SetCurrentPedWeapon(cache.ped, `weapon_unarmed`, true)
    AttachEntityToEntity(object, cache.ped, boneIndex, 0.03, 0.002, -0.0, 10.0, 160.0, 0.0, true, false, false, false, 2, true)
    SetModelAsNoLongerNeeded(model)
    
    TaskPlayAnim(cache.ped, animDict, 'base', 3.0, 3.0, -1, 49, 0, false, false, false)
    RemoveAnimDict(animDict)
end

RegisterNetEvent('paradox_contracts:openTablet', function()
    local user, isAdmin = lib.callback.await('paradox_contracts:fetchUser', false)
    user.isAdmin = isAdmin

    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'open_tablet',
        data = {
            user = user
        }
    })

    createObject()
end)

RegisterNUICallback('close_tablet', function (_, cb)
    SetNuiFocus(false, false)
    deleteObject()
    cb(1)
end)

Framework.onPlayerLoaded(function()
    Blackmarket = lib.callback.await('paradox_contracts:fetchBlackmarket', false)

    SetTimeout(500, function()
        SendNUIMessage({
            action = 'init',
            data = {
                locale = Config.uiLanguage,
                blackmarket = Blackmarket.items
            }
        })
    end)
end)