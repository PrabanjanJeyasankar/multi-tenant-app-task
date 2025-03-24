import userData from "../../../data/userData"

export const authenticateUser = async (credentials) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           
            const user = userData.find(
                (user) =>
                    user.username === credentials.username &&
                    user.password === credentials.password
            )

            if (user) {
                resolve({ user: { name: user.username }, role: user.role })
            } else {
                reject(new Error('Invalid credentials'))
            }
        }, 1000)
    })
}
