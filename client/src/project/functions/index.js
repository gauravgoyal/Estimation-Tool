export const identifyRoleType = (rate) => {
    // role_type = 1 => Frontend
    // role_type = 2 => Backend
    let type = ""
    switch (rate.role_type) {
        case 1:
        type = "Frontend"
        break

        case 2:
        type = "Backend"
        break

        default:
        type = "Management"
        break
    }

    return type;
}

export const indentifyResourceType = (rate) => {
    // resource_type = 1 => Acquia
    let type = ""
    switch (rate.resource_type) {
        case 1:
        type = "Partner"
        break

        default:
        type = "Acquia"
        break
    }

    return type;
}

export const getRoleType = (rate) => {
    // role_type = 1 => Frontend
    // role_type = 2 => Backend
    let type = 0
    switch (rate.role_type) {
        case "Frontend":
        type = 1
        break

        case "Backend":
        type = 2
        break

        default:
        break
    }

    return type;
}

export const getResourceType = (rate) => {
    // resource_type = 1 => Acquia
    let type = 0
    switch (rate.resource_type) {
        case "Partner":
        type = 1
        break

        default:
        break
    }

    return type;
}