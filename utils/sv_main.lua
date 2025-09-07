lib.locale()
lib.versionCheck('https://github.com/paradoxtended/paradox_heistcontracts')

Utils = {}

---@diagnostic disable-next-line: duplicate-set-field
function Utils.getTableSize(t)
    local count = 0

	for _,_ in pairs(t) do
		count = count + 1
	end

	return count
end

local labels, ready

CreateThread(function()
    while not labels or Utils.getTableSize(labels) == 0 do
        local items = Framework.getItems()
        local temp = {}

        for name, item in pairs(items) do
            temp[item.name or name] = item.label or 'NULL'
        end

        labels = temp

        Wait(100)
    end

    ready = true
end)

lib.callback.register('paradox_contracts:getItemLabels', function()
    while not ready do Wait(100) end

    return labels
end)

---@param name string
---@diagnostic disable-next-line: duplicate-set-field
function Utils.getItemLabel(name)
    return labels[name] or labels[name:upper()] or 'ITEM_NOT_FOUND'
end