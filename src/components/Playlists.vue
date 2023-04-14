<template>
    <div class="card" style="min-width: 300px">
        <h3 class="card-header">Playlists</h3>
        <div class="card-body">
            <ul v-if="playlists.length" class="list-group" id="playlists-ul">
                <li class="list-group-item list-group-item-dark playlists-li">
                    <router-link class="playlist-link" to="/">All Songs</router-link>
                </li>
                <li v-for="playlist in playlists" :key="playlist.slug" class="list-group-item playlists-li">
                    <form id="edit-playlist-form" v-if="editing && activePlaylist === playlist" @submit.prevent="doneEditPlaylist">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="playlist.name" />
                        </div>
                        <button type="submit" class="btn btn-success"><fa-icon icon="fa-solid fa-check" /></button>
                    </form>
                    <router-link v-if="activePlaylist !== playlist" class="playlist-link" :to="'/playlist/' + playlist.slug">{{ playlist.name }}</router-link>
                    <div class="playlist-tool-buttons">
                        <div class="dropdown">
                            <button class="btn btn-secondary" id="dropdownButtonItems" data-bs-toggle="dropdown" aria-expanded="false"><fa-icon icon="fa-solid fa-chevron-down" /></button>
                            <div class="dropdown-menu" aria-labelledby="dropdownButtonItems">
                                <button @click="editingPlaylist(playlist)" type="button" class="dropdown-item"><fa-icon icon="fa-solid fa-pen-square" />  Rename</button>
                                <button @click="deletePlaylist(playlist)" type="button" class="dropdown-item"><fa-icon icon="fa-solid fa-trash-alt" />  Delete</button>
                            </div>
                        </div>
                        <button @click="changePlaylist(playlist)" class="btn btn-primary">
                            <fa-icon v-if="selectedPlaylist !== playlist" icon="fa-solid fa-plus" />
                            <span v-if="addingSong && selectedPlaylist === playlist">
                                <fa-icon icon="fa-solid fa-times" />
                            </span>
                        </button>
                    </div>
                </li>
            </ul>
            <form @submit.prevent="addPlaylist" class="add-playlist-form">
                <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="new playlist"
                      autocomplete="off" 
                      v-model="newPlaylist"
                    />
                </div>
                <div class="form-group">
                    <button type="submit" class="form-control btn btn-secondary">
                        <fa-icon icon="fa-solid fa-plus" />
                        Add
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import slugify from "slugify";

export default {
    name: "Playlists",
    props: {
        selectedPlaylist: {
            type: Object,
            required: false,
        },
        addingSong: {
            type: Boolean,
            required: false,
        }
    },
    data() {
        return {
            playlists: [
                {
                    name: "pl 1",
                    slug: "pl-1",
                    songs: []
                },
                {
                    name: "pl 2",
                    slug: "pl-2",
                    songs: []
                },
            ],
            newPlaylist: "",
            editing: false,
            activePlaylist: null,
        };
    },
    methods: {
        addPlaylist() {
            if(this.newPlaylist === ""){
                return;
            }
            const playlistObject = {
                name: this.newPlaylist,
                slug: slugify(this.newPlaylist),
                songs: [],
            };
            this.playlists.push(playlistObject);
            this.newPlaylist = "";
        },
        deletePlaylist(playlist) {
            this.playlists.splice(this.playlists.findIndex(p => p === playlist), 1);
        },
        changePlaylist(playlist) {
            this.$emit("changePlaylist", playlist);
        },
        editingPlaylist(playlist) {
            if(this.activePlaylist === playlist) {
                this.editing = false;
                this.activePlaylist = null;
            } else {
                this.activePlaylist = playlist;
                this.editing = true;
            }
        },
        doneEditPlaylist() {
            this.activePlaylist.slug = slugify(this.activePlaylist.name);
            this.activePlaylist = null;
            this.editing = false;
        }
    }
}
</script>
<style>
#playlists-ul a {
  text-decoration: none;
  color: inherit;
}
#playlists-ul a:hover {
  color: inherit;
}
#playlists-ul {
    margin-bottom: 1rem;
}
#playlists-ul .playlists-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#playlists-ul .playlist-link {
    flex: 1;
    color: #2366aa;
}
#playlists-ul .playlist-link:hover {
    color: #5599cc;
}
.playlist-tool-buttons {
    display: flex;
    gap: 1rem;
}
.playlist-tool-buttons button {
    padding: 0.2rem 0.5rem;
}
.add-playlist-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.add-playlist-form button {
    white-space: nowrap;
    font-size: 0.8rem;
}
#edit-playlist-form {
    display: flex;
    gap: 1rem;
}
</style>