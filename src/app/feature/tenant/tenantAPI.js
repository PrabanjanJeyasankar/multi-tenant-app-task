import tenantsConfig from '../../../config/tenants.json'

export const getSubdomain = () => {
    const hostname = window.location.hostname

    if (hostname === 'localhost') {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get('tenant') || 'subdomain1'
    }

    const parts = hostname.split('.')
    return parts.length > 2 ? parts[0] : 'subdomain1'
}

export const getTenantConfig = async () => {
    const subdomain = getSubdomain()
    const tenantConfig = tenantsConfig.tenants[subdomain]

    if (!tenantConfig) {
        throw new Error(`No configuration found for tenant: ${subdomain}`)
    }

    return { ...tenantConfig, subdomain }
}
