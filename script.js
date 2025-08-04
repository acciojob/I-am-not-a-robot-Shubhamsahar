const images = [
  'https://picsum.photos/id/1011/100',
  'https://picsum.photos/id/1025/100',
  'https://picsum.photos/id/1035/100',
  'https://picsum.photos/id/1043/100',
  'https://picsum.photos/id/1062/100'
];

let selectedTiles = [];
let duplicateIndex;

const container = document.getElementById("tile-container");
const h3 = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

// Shuffle helper
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Render tiles
function renderTiles() {
  container.innerHTML = '';
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = '';
  h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Pick a random image to duplicate
  const randomIdx = Math.floor(Math.random() * images.length);
  const duplicateImg = images[randomIdx];

  // Create array with one duplicate
  const tempImages = [...images];
  tempImages.push(duplicateImg);

  // Shuffle
  const shuffled = shuffle(tempImages);

  shuffled.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.index = idx;
    img.classList.add('tile');
    img.addEventListener('click', () => handleClick(img));
    container.appendChild(img);
  });
}

function handleClick(img) {
  if (selectedTiles.length === 2) return;

  const index = img.dataset.index;
  if (selectedTiles.includes(index)) return; // prevent selecting same image twice

  img.classList.add("selected");
  selectedTiles.push(index);
  resetBtn.style.display = "inline-block";

  if (selectedTiles.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".tile").forEach(tile => {
    tile.classList.remove("selected");
  });
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = '';
  h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  const [first, second] = selectedTiles;

  const src1 = document.querySelectorAll(".tile")[first].src;
  const src2 = document.querySelectorAll(".tile")[second].src;

  verifyBtn.style.display = "none";

  if (src1 === src2) {
    para.textContent = "You are a human. Congratulations!";
    para.style.color = "green";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    para.style.color = "red";
  }
});

window.onload = renderTiles;
