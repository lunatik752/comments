export const api = {
    getPosts() {
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        text: 'Hello friends!',
                        likes: 12
                    },
                    {
                        id: 2,
                        text: 'I like React',
                        likes: 111
                    },
                ])
            }, 2000)
        })
    }
}
