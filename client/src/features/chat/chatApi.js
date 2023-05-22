import apis from "../apis/apis";

const chatApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) => `/conversations/${email}`,
        }),
        getMessages: builder.query({
            query: (conversationId) => `/messages/${conversationId}`
        }),
        postMessage: builder.mutation({
            query: (data) => ({
                url: `/messages`,
                method: "POST",
                body: data
            })
        }),
    })
})

export const { useGetConversationsQuery, useGetMessagesQuery, usePostMessageMutation } = chatApi;