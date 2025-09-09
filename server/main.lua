lib.locale()

---@type table<string, User>
local users = {}

---@param identifier string
local function createUser(identifier)
    local player = Framework.getPlayerFromIdentifier(identifier)

    ---@type User
    users[identifier] = {
        data = { name = GetPlayerName(player.source), image = Config.defaultData.image },
        stats = {
            coins = Config.defaultData.coins,
            xp = Config.defaultData.xp,
            completedContracts = 0,
            firstLogged = os.date("%m/%d/%Y, %I:%M:%S %p", os.time())
        }
    }
    ---@todo insert into database
end

lib.callback.register('paradox_contracts:fetchUser', function(source)
    local player = Framework.getPlayerFromId(source)

    if not player then return end

    local identifier = player:getIdentifier()

    if not users[identifier] then
        createUser(identifier)
    end

    return users[identifier], player:hasOneOfGroups(Config.adminGroups)
end)

if Config.command then
    lib.addCommand(Config.command, {
        help = locale('command_help')
    }, function(source)
        local player = Framework.getPlayerFromId(source)

        if not player or not player:hasOneOfGroups(Config.adminGroups) then return end

        TriggerClientEvent('paradox_contracts:openTablet', source)
    end)
end

---@param player Player
function GetUserData(player)
    return users[player:getIdentifier()]
end