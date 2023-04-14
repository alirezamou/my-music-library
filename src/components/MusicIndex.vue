<template>
    <table class="table table-striped align-middle">
        <thead class="table-dark">
            <tr>
                <th class="col-1" scope="col">#</th>
                <th class="col-3" scope="col">
                    <button @click="changeSortBy('title')" class="button column-th" role="button">
                        <span class="title-th">Title</span>
                        <fa-icon v-if="sortBy === 'title' && sortDir ==='desc'" icon="fa-solid fa-chevron-up" />
                        <fa-icon v-if="sortBy === 'title' && sortDir ==='asc'" icon="fa-solid fa-chevron-down" />
                    </button>
                </th>
                <th class="col-2" scope="col">
                    <button @click="changeSortBy('artist')" class="button column-th" role="button">
                        <span class="title-th">Artist</span>
                        <fa-icon v-if="sortBy === 'artist' && sortDir ==='desc'" icon="fa-solid fa-chevron-up" />
                        <fa-icon v-if="sortBy === 'artist' && sortDir ==='asc'" icon="fa-solid fa-chevron-down" />
                    </button>
                </th>
                <th class="col-3" scope="col">
                    <button @click="changeSortBy('album')" class="button column-th" role="button">
                        <span class="title-th">Album</span>
                        <fa-icon v-if="sortBy === 'album' && sortDir ==='desc'" icon="fa-solid fa-chevron-up" />
                        <fa-icon v-if="sortBy === 'album' && sortDir ==='asc'" icon="fa-solid fa-chevron-down" />
                    </button>
                </th>
                <th class="col-3" scope="col">
                    <button @click="changeSortBy('genre')" class="button column-th" role="button">
                        <span class="title-th">Genre</span>
                        <fa-icon v-if="sortBy === 'genre' && sortDir ==='desc'" icon="fa-solid fa-chevron-up" />
                        <fa-icon v-if="sortBy === 'genre' && sortDir ==='asc'" icon="fa-solid fa-chevron-down" />
                    </button>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(song, index) in paginatedSongs" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                    <button v-if="addingSong" @click="(e) => addSong(song, e)" class="button add-song-btn">
                        <span>+</span>
                        <fa-icon icon="fa-solid fa-check" />
                    </button>
                    {{ song.title }}
                </td>
                <td>{{ song.artist }}</td>
                <td>{{ song.album }}</td>
                <td>{{ song.genre }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import songs from "@/assets/musics.json";
import { orderBy } from "lodash-es";
import paginate from "@/utils/paginate";

export default {
    name: "MusicIndex",
    created() {
        window.addEventListener("scroll", () => {
            if(this.totalPages <= this.currentPage) return;
            if(document.body.offsetHeight - 100 <= window.innerHeight + window.scrollY) {
                this.currentPage++;
            }
        })
    },
    data() {
        return {
            allSongs: songs,
            pageSize: 25,
            currentPage: 0,
            sortBy: "",
            sortDir: "asc",
            addingSong: true,
            selectedPlaylist: {
                name: "my playlist",
                slug: "my-playlist",
                songs: [],
            },
        }
    },
    computed: {
        paginatedSongs() {
            return paginate(this.sortedSongs, this.pageSize, this.currentPage, true);
        },
        sortedSongs() {
            if(this.sortBy === "") return this.allSongs;

            return orderBy(this.allSongs, this.sortBy, this.sortDir);
        },
        totalPages() {
            return Math.ceil(this.allSongs.length / this.pageSize);
        },
    },
    methods: {
        changeSortBy(value) {
            if(this.sortBy === value) {
                if(this.sortDir === "asc") {
                    this.sortDir = "desc";
                } else {
                    this.sortDir = "asc";
                }
                return;
            }
            this.sortBy = value;
            this.sortDir = "asc";
        },
        addSong(song, e) {
            const btnElement = e.currentTarget;

            this.selectedPlaylist.songs.push(song);

            btnElement.classList.add("added");
            setTimeout(() => {
                btnElement.classList.remove("added");
            }, 800);
        },
        changePlaylist(playlist) {
            this.selectedPlaylist = playlist;
        }
    }
}
</script>
<style>
a {
    text-decoration: none;
    color: inherit;
}
a:hover {
    color: inherit;
}
.button {
  border: 0;
  border-radius: 0.25rem;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 100%;
  font-weight: inherit;
  background-color: inherit;
  color: inherit;
}
.column-th .title-th {
    margin-right: 0.5rem;
}
.add-song-btn {
    background-color: #075699;
    color: #fff;
    margin-right: 0.5rem;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
}
.add-song-btn span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    transition: opacity 0.8s ease;
}
.add-song-btn svg {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: inherit;
    transition: opacity 0.8s ease;
}
.add-song-btn.added svg {
    opacity: 1;
}
.add-song-btn.added span {
    opacity: 0;
}
</style>