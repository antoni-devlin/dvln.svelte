<script>
import { onMount } from 'svelte';

let userId = "105494066543086834878"; //My Google Books userId - this is publically available
let fields =
  "fields=items(id,volumeInfo(title,authors,publishedDate,description,pageCount,imageLinks(thumbnail),infoLink)";

async function getShelves() {
  let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves`;
  let response = await fetch(queryString);
  return response.json();
}

async function getBooks(bookshelfId) {
  let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${bookshelfId}/volumes?${fields})`;
  let response = await fetch(queryString);
  return response.json();
}

function constructBooks(jsonResponse) {
  let ids = jsonResponse["items"].map((x) => x.id);
  let titles = jsonResponse["items"].map((x) => x.volumeInfo.title);
  console.log(ids, titles);
}

onMount(constructBooks(getBooks(4)))

</script>

<h1>About</h1>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nam aliquid incidunt dolor eveniet error et magnam porro alias numquam omnis animi, eos quia, voluptates velit rem ratione perspiciatis nulla!</p>

<h2> Book list </h2>



<style>


</style>