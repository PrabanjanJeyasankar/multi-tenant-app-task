export const getSubdomain = () => {
    const hostname = window.location.hostname

    if (hostname === 'localhost') {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get('tenant') || 'tenant1-uxmint' // used "tenant1-uxmint" for local testing purpose
    }

    const parts = hostname.split('.')
    return parts.length > 2 ? parts[0] : 'tenant1-uxmint'
}

export const getTenantConfig = async () => {
    const subdomain = getSubdomain()

    try {
        const response = await fetch('/config/tenants.json')

        if (!response.ok) {
            throw new Error(
                `🚨 Failed to load tenants.json: ${response.status}`
            )
        }

        const tenantsConfig = await response.json()

        const tenantConfig = tenantsConfig.tenants[subdomain]

        if (!tenantConfig) {
            throw new Error(
                `🚨 No configuration found for tenant: ${subdomain}`
            )
        }

        return { ...tenantConfig, subdomain }
    } catch (error) {
        console.error('Error fetching tenant config:', error)
        throw error
    }
}
