import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "../utils/markdown";

const usePostStore = create(
  persist(
    (set, get) => ({
      posts: [],
      currentPost: null,

      createPost: (postData) => {
        const newPost = {
          id: generateId(),
          ...postData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          posts: [newPost, ...state.posts],
          currentPost: newPost,
        }));

        return newPost;
      },

      updatePost: (id, postData) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, ...postData, updatedAt: new Date().toISOString() }
              : post,
          ),
          currentPost:
            state.currentPost?.id === id
              ? {
                  ...state.currentPost,
                  ...postData,
                  updatedAt: new Date().toISOString(),
                }
              : state.currentPost,
        }));
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
          currentPost: state.currentPost?.id === id ? null : state.currentPost,
        }));
      },

      getPost: (id) => {
        return get().posts.find((post) => post.id === id);
      },

      setCurrentPost: (post) => {
        set({ currentPost: post });
      },

      clearCurrentPost: () => {
        set({ currentPost: null });
      },

      togglePostStatus: (id) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  isActive: !post.isActive,
                  updatedAt: new Date().toISOString(),
                }
              : post,
          ),
        }));
      },

      saveDraft: (draftData) => {
        set({ currentPost: { ...draftData, isDraft: true } });
      },

      getActivePosts: () => {
        return get().posts.filter((post) => post.isActive);
      },

      searchPosts: (query) => {
        const posts = get().posts;
        if (!query) return posts;

        const lowerQuery = query.toLowerCase();
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.content.toLowerCase().includes(lowerQuery) ||
            post.skills.some((skill) =>
              skill.toLowerCase().includes(lowerQuery),
            ),
        );
      },
    }),
    {
      name: "markflow-posts",
    },
  ),
);

export default usePostStore;
