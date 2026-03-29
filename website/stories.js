// ============================================================
// Interactive Stories Engine
// ============================================================

const storyData = {
    forest: {
        title: 'The Starry Forest',
        pages: {
            start: {
                text: 'You step into the Starry Forest. The trees shimmer with a soft blue glow, and tiny fireflies dance around you like floating lanterns. A gentle path splits into two directions ahead. To your left, you hear the sound of a bubbling stream. To your right, a trail of glowing mushrooms leads deeper into the woods.',
                choices: [
                    { text: '🌊 Follow the bubbling stream', next: 'stream' },
                    { text: '🍄 Follow the glowing mushrooms', next: 'mushrooms' }
                ]
            },
            stream: {
                text: 'You follow the stream and discover a crystal-clear pool. In the center, a small island holds a golden flower that pulses with warm light. A friendly frog sits on a lily pad nearby. "Hello, traveler!" croaks the frog. "That flower grants wishes, but only if you answer my riddle. What has keys but no locks, space but no room, and you can enter but can\'t go inside?"',
                choices: [
                    { text: '⌨️ "A keyboard!"', next: 'riddle_correct' },
                    { text: '🏠 "A house!"', next: 'riddle_wrong' }
                ]
            },
            riddle_correct: {
                text: '"Correct!" cheers the frog, doing a happy flip. The golden flower glows brighter and floats toward you. As you catch it, a shower of golden sparkles rains down, and you feel a warm, happy glow inside. The flower transforms into a beautiful golden star pin that attaches itself to your backpack.',
                choices: [
                    { text: '⭐ Make a wish with the star', next: 'wish' },
                    { text: '🐸 Thank the frog and explore more', next: 'frog_friend' }
                ]
            },
            riddle_wrong: {
                text: '"Not quite!" says the frog kindly. "But don\'t worry! Here\'s a hint — think about something you use every day that has buttons with letters on them." The frog winks encouragingly.',
                choices: [
                    { text: '⌨️ "Oh! A keyboard!"', next: 'riddle_correct' },
                    { text: '🤔 "Can I try a different path?"', next: 'mushrooms' }
                ]
            },
            wish: {
                text: 'You close your eyes and wish for something wonderful. The star glows brilliantly, and suddenly the entire forest lights up! Thousands of stars appear in the trees, creating a breathtaking starry canopy. Animals peek out from their homes to enjoy the beautiful sight. A family of deer, a wise owl, and even the frog all gather around you, smiling.',
                end: true,
                endEmoji: '✨',
                endTitle: 'The Star Maker',
                endText: 'You discovered the magic of the Starry Forest and made it shine even brighter! The forest creatures will always remember your kindness.'
            },
            frog_friend: {
                text: 'The frog hops alongside you as you explore the stream further. Together, you discover a hidden waterfall behind some vines. Behind the waterfall is a cozy cave filled with ancient drawings on the walls — pictures of children who visited the forest long ago. The frog tells you that each drawing was made by a friend of the forest. "Would you like to add yours?" asks the frog.',
                choices: [
                    { text: '🎨 Draw your picture on the wall', next: 'drawing_end' },
                    { text: '📖 Read the stories of past visitors', next: 'stories_end' }
                ]
            },
            drawing_end: {
                text: 'You pick up a glowing crystal and draw a picture of yourself and the frog on the cave wall. As you finish, the drawing comes alive briefly, waving at you! The frog tears up with joy. "You\'re now an official Friend of the Forest!" A tiny golden badge appears on your backpack.',
                end: true,
                endEmoji: '🎨',
                endTitle: 'Friend of the Forest',
                endText: 'Your drawing will live on the cave wall forever, inspiring future visitors to the magical Starry Forest!'
            },
            stories_end: {
                text: 'You sit down and read the stories. Each one tells of a different adventure — a child who befriended a cloud, another who taught the trees to sing. You realize that every visitor added something magical to the forest. The frog smiles. "And you brought the brightest star. The forest will never forget you."',
                end: true,
                endEmoji: '📚',
                endTitle: 'The Story Keeper',
                endText: 'You learned the ancient stories of the Starry Forest and became part of its magical history!'
            },
            mushrooms: {
                text: 'The glowing mushrooms lead you to a clearing where a magnificent tree stands. Its trunk is as wide as a house, and its branches reach high into the starry sky. A small door is carved into the trunk. Next to the door sits a tiny creature made entirely of light — a luminous sprite! "Welcome!" it chimes. "I\'m Lumi. Would you like to climb the Great Tree or enter the door?"',
                choices: [
                    { text: '🌳 Climb the Great Tree', next: 'climb' },
                    { text: '🚪 Enter the tiny door', next: 'door' }
                ]
            },
            climb: {
                text: 'Lumi flies beside you as you climb branch by branch. Each level of the tree holds something wonderful — a branch of singing birds, a hollow filled with soft glowing clouds you can bounce on, and finally, the very top. From here, you can see the entire magical world spread out below — forests, mountains, and a shimmering ocean in the distance. Lumi hands you a tiny telescope.',
                choices: [
                    { text: '🔭 Look through the telescope', next: 'telescope_end' }
                ]
            },
            telescope_end: {
                text: 'Through the telescope, you see other children in distant magical lands having their own adventures. You wave, and amazingly, they wave back! Lumi giggles. "The magic connects us all. Wherever you go, you\'ll always have friends." A warm feeling fills your heart as stars twinkle all around you.',
                end: true,
                endEmoji: '🔭',
                endTitle: 'The Sky Watcher',
                endText: 'From the top of the Great Tree, you discovered that magic connects everyone, everywhere!'
            },
            door: {
                text: 'You shrink down to fit through the tiny door and find yourself in a cozy underground home. Shelves line the walls, filled with jars of starlight, bottles of moonbeams, and boxes of dreams. Lumi explains this is the Heart of the Forest, where all the magic begins. "You can take one gift home with you," Lumi offers.',
                choices: [
                    { text: '✨ A jar of starlight', next: 'starlight_end' },
                    { text: '🌙 A bottle of moonbeams', next: 'moonbeam_end' }
                ]
            },
            starlight_end: {
                text: 'You choose the jar of starlight. It glows warmly in your hands, casting dancing patterns on the walls. "Whenever you feel scared at night," Lumi says, "just open the jar a little, and the starlight will keep you safe." You hug the jar close, feeling brave and happy.',
                end: true,
                endEmoji: '🌟',
                endTitle: 'The Light Bearer',
                endText: 'You carry starlight from the Heart of the Forest, a gift that will always light your way!'
            },
            moonbeam_end: {
                text: 'You choose the bottle of moonbeams. When you open it, soft silver light spills out, and the most beautiful lullaby you\'ve ever heard begins to play. "Moonbeams carry the songs of the night sky," Lumi whispers. "They\'ll give you the sweetest dreams." You smile, already feeling sleepy and peaceful.',
                end: true,
                endEmoji: '🌙',
                endTitle: 'The Dream Keeper',
                endText: 'You carry moonbeams that will fill your nights with the most wonderful dreams!'
            }
        }
    },
    sea: {
        title: 'Deep Sea Discovery',
        pages: {
            start: {
                text: 'You dive beneath the sparkling ocean waves and find yourself in a world of wonder. Colorful coral towers rise around you, and schools of rainbow fish swim by. A friendly blue whale named Bubbles floats over. "Hello! I\'m heading to the Hidden City. Want to come along? We can take the Coral Tunnel or ride the Current Express!"',
                choices: [
                    { text: '🐚 Take the Coral Tunnel', next: 'coral' },
                    { text: '🌊 Ride the Current Express', next: 'current' }
                ]
            },
            coral: {
                text: 'The Coral Tunnel is magical! The walls are made of living coral that glows in every color imaginable. Tiny seahorses act as tour guides, pointing out ancient carvings on the tunnel walls. Suddenly, you spot something unusual — a treasure chest half-buried in the sand, and a mysterious glowing cave entrance nearby.',
                choices: [
                    { text: '💎 Open the treasure chest', next: 'treasure' },
                    { text: '✨ Explore the glowing cave', next: 'cave' }
                ]
            },
            treasure: {
                text: 'Inside the treasure chest, you find a beautiful pearl that changes color with your mood! When you\'re happy, it turns golden. When you\'re calm, it turns blue. Bubbles is amazed. "That\'s the Mood Pearl! It was lost centuries ago. The mer-people will be so happy!" An excited group of mer-children swim over, cheering.',
                choices: [
                    { text: '🎁 Give the pearl to the mer-people', next: 'give_pearl' },
                    { text: '👀 Keep the pearl and visit the city', next: 'keep_pearl' }
                ]
            },
            give_pearl: {
                text: 'The mer-people celebrate with a grand underwater festival! They sing songs, perform acrobatic dances with dolphins, and create amazing bubble art. As a thank-you gift, they weave you a crown of sea flowers that never wilts. The mer-queen smiles. "You have the heart of a true ocean friend."',
                end: true,
                endEmoji: '👑',
                endTitle: 'Ocean Royalty',
                endText: 'Your kindness brought joy to the entire underwater kingdom! You are now an honorary mer-friend.'
            },
            keep_pearl: {
                text: 'You swim with Bubbles toward the Hidden City, the Mood Pearl glowing warmly. The city is spectacular — towers of crystal, streets of soft sand, and gardens of dancing sea plants. The pearl begins to glow brighter and brighter, and suddenly it projects a map in the water! "It\'s showing us the location of the ancient Ocean Library!" gasps Bubbles.',
                choices: [
                    { text: '📚 Follow the map to the library', next: 'library_end' }
                ]
            },
            library_end: {
                text: 'The Ocean Library is a vast dome of crystal filled with books made of waterproof seaweed. Each book contains a different ocean story. A wise octopus librarian welcomes you. "The Mood Pearl brought you here for a reason — you\'re meant to add your story to our collection!" You write about your adventure, and the book starts glowing.',
                end: true,
                endEmoji: '📖',
                endTitle: 'The Ocean Author',
                endText: 'Your adventure story is now part of the ancient Ocean Library, where sea creatures will read it for generations!'
            },
            cave: {
                text: 'The glowing cave is full of bioluminescent creatures! Jellyfish float like lanterns, and tiny glowing plankton create swirling patterns. In the center of the cave, a baby sea turtle is tangled in some old seaweed. It looks at you with big, hopeful eyes.',
                choices: [
                    { text: '🐢 Help free the baby turtle', next: 'turtle' },
                    { text: '📢 Call Bubbles for help', next: 'bubbles_help' }
                ]
            },
            turtle: {
                text: 'You gently untangle the seaweed from the baby turtle. It does a happy spin and nuzzles against you! A mama sea turtle appears from the shadows, looking relieved. She carries a magnificent shell on her back that shimmers with rainbow light. "Thank you for saving my baby," she says. "Please, take this Rainbow Shell as our gift."',
                end: true,
                endEmoji: '🐢',
                endTitle: 'Turtle Rescuer',
                endText: 'You saved a baby sea turtle and earned the trust of the gentle sea turtle family!'
            },
            bubbles_help: {
                text: 'Bubbles carefully moves into the cave and uses a gentle water current to help untangle the seaweed. Working together, you free the baby turtle in no time! The baby turtle is so grateful that it leads you both to a hidden garden behind the cave, where the most beautiful underwater flowers bloom in every color. "This is the Secret Garden," Bubbles whispers in awe.',
                end: true,
                endEmoji: '🌺',
                endTitle: 'Garden Discoverer',
                endText: 'By working together with Bubbles, you discovered the legendary Secret Garden of the sea!'
            },
            current: {
                text: 'The Current Express is like an underwater roller coaster! You and Bubbles zoom through warm and cool currents, spiraling past amazing sights — a sunken ship covered in friendly barnacles, a field of giant clams that wave hello, and a group of playful dolphins doing flips. Suddenly the current splits into two paths.',
                choices: [
                    { text: '🐬 Follow the dolphins', next: 'dolphins' },
                    { text: '🏛️ Head straight to the Hidden City', next: 'city' }
                ]
            },
            dolphins: {
                text: 'The dolphins are thrilled you want to play! They teach you their favorite game — catching bubble rings. You become surprisingly good at it! After the game, the lead dolphin, Splash, offers to show you something special. She leads you to a spot where the sunlight creates an underwater rainbow — a full arc of colors shimmering in the water.',
                choices: [
                    { text: '🌈 Swim through the rainbow', next: 'rainbow_end' }
                ]
            },
            rainbow_end: {
                text: 'Swimming through the underwater rainbow fills you with pure joy! Each color you pass through makes you feel something different — red fills you with energy, blue brings peace, green inspires creativity. When you emerge on the other side, you\'re glowing with all the colors! The dolphins sing a song of celebration.',
                end: true,
                endEmoji: '🌈',
                endTitle: 'Rainbow Swimmer',
                endText: 'You swam through a magical underwater rainbow and carry its joy with you forever!'
            },
            city: {
                text: 'The Hidden City rises before you like a dream. Crystal spires reach toward the surface, and bioluminescent gardens line every street. In the center of the city, a grand fountain shoots water in mesmerizing patterns. The mayor, a wise old seahorse, greets you. "Welcome! We\'ve been expecting a surface friend. Would you like to ring the Crystal Bell? It hasn\'t been rung in a hundred years!"',
                choices: [
                    { text: '🔔 Ring the Crystal Bell', next: 'bell_end' }
                ]
            },
            bell_end: {
                text: 'You pull the rope and the Crystal Bell rings with the most beautiful sound you\'ve ever heard. The entire ocean seems to pause and listen. Then, something magical happens — every creature in the sea, from the tiniest shrimp to the biggest whale, begins to sing along. The ocean fills with the most harmonious music, and you realize you\'ve started the legendary Ocean Concert!',
                end: true,
                endEmoji: '🔔',
                endTitle: 'The Bell Ringer',
                endText: 'You rang the Crystal Bell and united every creature in the ocean in a magnificent concert of harmony!'
            }
        }
    }
};

let currentStory = null;
let currentPage = null;
let pageCount = 0;

function startStory(storyKey) {
    currentStory = storyData[storyKey];
    currentPage = 'start';
    pageCount = 1;
    document.getElementById('storyList').classList.add('hidden');
    document.getElementById('storyReader').classList.remove('hidden');
    renderStoryPage();
}

function renderStoryPage() {
    const page = currentStory.pages[currentPage];
    document.getElementById('storyTitle').textContent = currentStory.title;
    document.getElementById('pageNum').textContent = pageCount;
    document.getElementById('storyText').textContent = page.text;

    const choicesEl = document.getElementById('storyChoices');
    const endEl = document.getElementById('storyEnd');

    if (page.end) {
        choicesEl.classList.add('hidden');
        endEl.classList.remove('hidden');
        document.getElementById('endEmoji').textContent = page.endEmoji;
        document.getElementById('endTitle').textContent = page.endTitle;
        document.getElementById('endText').textContent = page.endText;
        addSparkles(3);
    } else {
        choicesEl.classList.remove('hidden');
        endEl.classList.add('hidden');
        choicesEl.innerHTML = page.choices.map(c => `
            <button onclick="makeChoice('${c.next}')" class="story-choice w-full text-left bg-surface-container-low hover:bg-primary-container/30 p-4 rounded-xl font-bold text-on-surface border-2 border-transparent hover:border-primary/20 transition-all flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">arrow_forward</span>
                ${c.text}
            </button>
        `).join('');
    }

    // Scroll to top of story
    document.getElementById('storyReader').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function makeChoice(nextPage) {
    currentPage = nextPage;
    pageCount++;
    renderStoryPage();
}

function backToStories() {
    document.getElementById('storyList').classList.remove('hidden');
    document.getElementById('storyReader').classList.add('hidden');
    document.getElementById('storyEnd').classList.add('hidden');
    currentStory = null;
    currentPage = null;
}
