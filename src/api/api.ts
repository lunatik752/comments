export type AuthorApiType = {
    id: number
    name: string
}

export type CommentApiType = {
    id: number
    text: string
    author: AuthorApiType
}

export type PostApiType = {
    id: number
    text: string
    likes: number
    author: AuthorApiType
    lastComments: CommentApiType[]
}

export const api = {
    getPosts(): Promise<PostApiType[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        text: 'Hello friends!',
                        likes: 12,
                        author: {id: 1, name: 'Max'},
                        lastComments: [
                            {
                                id: 98,
                                text: 'Cool!',
                                author: {id: 3, name: 'Andy'}
                            },
                            {
                                id: 97,
                                text: 'Very cool!',
                                author: {id: 3, name: 'Andy'}
                            }]
                    },
                    {
                        id: 2,
                        text: 'I like React',
                        likes: 111,
                        author: {id: 2, name: 'Kna'},
                        lastComments: []
                    },
                    {
                        id: 3,
                        text: 'I like Angular',
                        likes: 111,
                        author: {id: 1, name: 'Max'},
                        lastComments: [
                            {
                                id: 57,
                                text: 'Of course',
                                author: {id: 1, name: 'Max'}
                            },
                            {
                                id: 56,
                                text: 'Really?',
                                author: {id: 2, name: 'Kna'}

                            }]
                    },
                ])
            }, 2000)
        })
    },
    getCommentsForPost(postId: number) {
        return Promise.resolve([
            {
                id: 55,
                text: 'Of course',
                author: {id: 1, name: 'Max'}
            },
            {
                id: 54,
                text: 'Really?',
                author: {id: 2, name: 'Kna'}
            },
            {
                id: 53,
                text: 'Bullshit',
                author: {id: 3, name: 'Andy'}
            },
            {
                id: 52,
                text: 'Where comments?',
                author: {id: 1, name: 'Max'}
            },
        ])
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    },
    updateAuthor(authorId: number, authorName: string) {
        return Promise.resolve({})
    }
}
