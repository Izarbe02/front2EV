// src/stores/posts.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type PostDto from "@/stores/dtos/post.dto";

export const usePostsStore = defineStore("posts", () => {
  // Estado reactivo
  const posts = ref<PostDto[]>([]);
  const currentPost = ref<PostDto | null>(null);
  const errorMessage = ref<string>("");
  const successMessage = ref<string>("");

  // Obtener todos los posts (GET: api/Post)
  async function findAll() {
    try {
      const response = await fetch("http://localhost:8888/api/Post");
      if (!response.ok) throw new Error("Error al obtener posts");
      const data = await response.json();
      posts.value.splice(0, posts.value.length, ...data);
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener posts:", error);
    }
  }

  // Obtener un post por ID (GET: api/Post/{id})
  async function getPost(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Post/${id}`);
      if (!response.ok) throw new Error("Error al obtener el post");
      const data = await response.json();
      currentPost.value = data;
      return data;
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al obtener el post:", error);
    }
  }

  // Crear un nuevo post (POST: api/Post)
  async function createPost(post: PostDto) {
    try {
      const response = await fetch("http://localhost:8888/api/Post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error("Error al crear el post");
      const createdPost = await response.json();
      posts.value.push(createdPost);
      successMessage.value = "Post creado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al crear el post:", error);
    }
  }

  // Actualizar un post (PUT: api/Post/{id})
  async function updatePost(id: number, updatedPost: PostDto) {
    try {
      const response = await fetch(`http://localhost:8888/api/Post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) throw new Error("Error al actualizar el post");
      await findAll(); // Actualiza la lista de posts tras la modificación
      successMessage.value = "Post actualizado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al actualizar el post:", error);
    }
  }

  // Eliminar un post (DELETE: api/Post/{id})
  async function deletePost(id: number) {
    try {
      const response = await fetch(`http://localhost:8888/api/Post/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el post");
      posts.value = posts.value.filter(p => p.id !== id);
      successMessage.value = "Post eliminado correctamente";
    } catch (error: any) {
      errorMessage.value = error.message;
      console.error("Error al eliminar el post:", error);
    }
  }

  return {
    posts,
    currentPost,
    errorMessage,
    successMessage,
    findAll,
    getPost,
    createPost,
    updatePost,
    deletePost,
  };
});
