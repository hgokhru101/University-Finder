let url = "https://www.indiaeducation.net/rss/alertsmass_communication.xml";
const textarea = document.querySelector("#feed-textarea > ul");

feednami.load(url).then((feed) => {
  textarea.value = "";
  console.log(feed.entries);
  for (let entry of feed.entries) {
    //create a list element
    let li = document.createElement("li");
    //add HTML content to list items
    li.innerHTML = `<div class="card">
					<div class="card-body">
						<h5 class="card-title">
            <a href="${entry.link}">${entry.title}</a>
            </h5>
						<p class="card-text">
            <p class="mb-0 mt-2 font-italic">${entry.description}</p>
            <br>
						<h6>Publish Date: ${entry.pubDate} </h6>
						</p>
					</div>
				</div>`;
    //append HTML content to list
    textarea.appendChild(li);
  }
});