document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("tagInput");
    const suggestionsBox = document.getElementById("suggestions");
  
    function showSuggestions(value) {
      suggestionsBox.innerHTML = "";
      if (!value) return;
  
      const matches = predefinedTags.filter(tag =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
  
      matches.forEach(tag => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = tag;
        div.addEventListener("click", () => {
          input.value = tag;
          suggestionsBox.innerHTML = "";
        });
        suggestionsBox.appendChild(div);
      });
    }
  
    input.addEventListener("input", () => {
      showSuggestions(input.value);
    });
  
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".autocomplete-container")) {
        suggestionsBox.innerHTML = "";
      }
    });
  });  