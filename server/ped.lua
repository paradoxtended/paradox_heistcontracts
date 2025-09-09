local Blackmarket = require 'config.data.blackmarket'

if not Blackmarket then return end

---@param source number
---@param itemName string
lib.callback.register('paradox_contracts:buyItem', function(source, itemName)
    local player = Framework.getPlayerFromId(source)
    local item = Blackmarket.items[itemName]

    if not player or not item then return end

    local user = GetUserData(player)

    if item.price then
        local price = item.price
        
        if type(price) == 'number' and (player:getAccountMoney('money') < price or player:getAccountMoney('bank') < price) then
            return false, locale('not_enough_money')
        --elseif price?.coins and user.stats.coins < price?.coins then
            --return false, locale('not_enough_coins')
        elseif price?.money and (player:getAccountMoney('money') < price?.money or player:getAccountMoney('bank') < price?.money) then
            return false, locale('not_enough_money')
        end
    end

    if item.count then
        if item.count <= 0 then
            return false, locale('out_of_stock')
        else
            item.count = item.count - 1
        end
    end

    TriggerClientEvent('paradox_contracts:updateItem', -1, itemName)

    return true, locale('item_ordered')
end)