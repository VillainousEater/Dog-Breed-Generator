window.onload = function() {
    hideAllDescriptions();
    window.addEventListener('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            generateDog();
        }
        if (event.key === 'e' || event.key === 'E') {
            toggleVisibility();
        }
    });
};

function hideAllDescriptions() {
	document.querySelectorAll('.description, .headDescription').forEach(desc => {
		desc.style.display = 'none';
	});
}

function toggleVisibility() {
	var toggleableElements = document.getElementsByClassName('toggleable');
	var button = document.getElementById('toggleButton');
	var areHidden = Array.from(toggleableElements).some(el => el.style.display === 'none');
	for (var i = 0; i < toggleableElements.length; i++) {
		toggleableElements[i].style.display = areHidden ? 'block' : 'none';
	}
	button.textContent = areHidden ? '\u297E  Hide Details' : '\u297C  Show Details';
}

function showDescription(item, prefix) {
	var patternWords = item.split(" ");
	// For handling multi-word colors
	var nameParts = [];
	patternWords.forEach(function(word, index) {
		if (index === 0 || !word.startsWith("(")) {
			nameParts.push(word);
		}
	});
	var patternNameOnly = nameParts.join("");
	var descriptionId = prefix + patternNameOnly;
	// Hide all descriptions in this category
	document.querySelectorAll('.' + prefix).forEach(function(desc) {
		desc.style.display = 'none';
	});
	// Check if the item is a spotted nose and handle it separately
	if (item.includes("Spotted")) {
		var secondaryColor = patternWords[patternWords.length - 1].replace(/\(|\)/g, '');
		var secondaryDescriptionId = prefix + "IsabellaSpotted" + secondaryColor;
		var secondaryDescriptionElem = document.getElementById(secondaryDescriptionId);
		if (secondaryDescriptionElem) {
			secondaryDescriptionElem.style.display = 'block';
		}
	} else {
		// Show the correct description for non-spotted items
		var descriptionElem = document.getElementById(descriptionId);
		if (descriptionElem) {
			descriptionElem.style.display = 'block';
		}
	}
}

function generateDog() {
	// Code for generating size, body type, and purpose
	var list1 = ["Small", "Medium", "Large", "Giant"];
	var list2 = ["Mesomorph", "Ectomorph", "Endomorph"];
	var list3 = ["Hunting", "Cattle", "Working", "Companion"];
	// Code for generating coat attributes
	var lengthList = ["Hairless", "Crested", "Short", "Medium", "Long", "Powderpuff"];
	var typeList = ["Single", "Double"];
	var textureList = ["Smooth", "Silky", "Wavy", "Curly", "Cords", "Wire", "Rough"];
	var colorOptions = ["Black", "Chocolate", "Blue", "Gray", "Isabella", "Faded Chocolate", "Faded Blue", "Faded Isabella", "Seal", "Red", "Gold", "Cream", "White"];
	var patternList = ["Agouti", "Belton", "Blackback", "Brindle", "Extreme Piebald", "Flat", "Harlequin", "Mantle", "Merle", "Piebald", "Saddle", "Shaded", "Spotted", "Tuxedo"];
	// Code for generating head attributes
	var faceList = ["Blocky", "Snipey", "Domed", "Down", "Apple", "Dish", "Broken-up"];
	var eyesList = ["Brown", "Amber", "Blue"];
	var noseList = ["Black", "Chocolate", "Blue", "Isabella"];
	var earsList = ["Floppy", "Folded", "Perky"];
	var patternsList = ["Hat", "Ski", "Diamond", "Shaded", "Agouti", "Ticked", "Belton", "Sleepless", "Skunk", "Brindle", "Bandit", "Flat", "Nose", "Chimera", "Merle", "Mask", "Lozenge", "Asymmetrical", "Sable", "Blackback"];
	// Code for generating random basics
	var randomItem1 = list1[Math.floor(Math.random() * list1.length)];
	var randomItem2 = list2[Math.floor(Math.random() * list2.length)];
	var randomItem3 = list3[Math.floor(Math.random() * list3.length)];
	// begin random generation of Length, Type, and Texture
	var randomLength = lengthList[Math.floor(Math.random() * lengthList.length)];
	var randomType = typeList[Math.floor(Math.random() * typeList.length)];
	// Descriptors for textures
	var textureDescriptors = ["(Alternative)", "(Uncommon)", "(Rare)", "(Non-standard)"];
	// Generate the first texture
	var randomTexture = textureList[Math.floor(Math.random() * textureList.length)];
	// 10% chance to generate two coat textures
	if (Math.random() < 0.1) {
		// Add "(Standard)" descriptor to the first texture
		randomTexture += " (Standard)";
		// Generate and assign descriptor to the second texture
		var secondTexture;
		do {
			secondTexture = textureList[Math.floor(Math.random() * textureList.length)];
		} while (secondTexture === randomTexture.split(" ")[0]); // Ensure different texture
		var descriptorIndex = Math.floor(Math.random() * textureDescriptors.length);
		secondTexture += " " + textureDescriptors[descriptorIndex];
		// Combine, sort, and format textures
		var combinedTextures = [randomTexture, secondTexture];
		combinedTextures.sort();
		randomTexture = combinedTextures.join(", ");
	}
	// generate a number between 1-4
	var numberOfColors = Math.floor(Math.random() * 4) + 1;
	// begin random generation of (n) Colors
	var randomColors = [];
	while (randomColors.length < numberOfColors) {
		var randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
		if (!randomColors.includes(randomColor)) {
			randomColors.push(randomColor);
		}
		// Sort the selected colors alphabetically
		randomColors.sort();
	}
	// Descriptors for patterns
	var descriptors = ["(Alternative)", "(Uncommon)", "(Rare)", "(Non-standard)"];
	// begin random generation of Pattern(s)
	var randomPattern;
	var selectedPatterns = []; // Array to store selected patterns
	var generateMultiplePatterns = Math.random() < 0.2; // 20% chance to generate multiple patterns
	if (generateMultiplePatterns) {
		var numberOfPatterns = Math.floor(Math.random() * 2) + 2; // Random number between 2 and 3
		while (selectedPatterns.length < numberOfPatterns) {
			var tempPattern = patternList[Math.floor(Math.random() * patternList.length)];
			if (!selectedPatterns.includes(tempPattern)) {
				selectedPatterns.push(tempPattern);
			}
		}
		// Randomly assign descriptors to the patterns
		selectedPatterns = selectedPatterns.map((pattern, index) => {
			if (index === 0) {
				return pattern + " (Standard)"; // Mark the first pattern as Standard
			} else {
				var descriptorIndex = Math.floor(Math.random() * descriptors.length);
				return pattern + " " + descriptors[descriptorIndex];
			}
		});
		// Sort the selected patterns alphabetically
		selectedPatterns.sort();
		randomPattern = selectedPatterns.join(", ");
	} else {
		randomPattern = patternList[Math.floor(Math.random() * patternList.length)];
		selectedPatterns.push(randomPattern); // Add single pattern to the array
	}
	document.getElementById("coatPattern").textContent = randomPattern;
	// Show the description for each selected pattern
	selectedPatterns.forEach(function(pattern) {
		showDescription(pattern, 'coatPatternDesc');
	});
	// begin random generation of head
	var randomFace = faceList[Math.floor(Math.random() * faceList.length)];
	// Eyes with a chance of heterochromia
	var randomEyes = eyesList[Math.floor(Math.random() * eyesList.length)];
	var isHeterochromia = false; // Flag to track if heterochromia is generated
	if (Math.random() < 0.1) { // 10% chance
		var secondEyeColor = eyesList[Math.floor(Math.random() * eyesList.length)];
		randomEyes = "Heterochromia (" + randomEyes + "/" + secondEyeColor + ")";
		isHeterochromia = true;
	}
	// begin generation of nose
	var randomNose = noseList[Math.floor(Math.random() * noseList.length)];
	// Define secondary colors for Isabella (Spotted)
	var secondaryColors = ["Black", "Blue", "Chocolate"];
	// Nose with a chance of being spotted
	if (randomNose === "Isabella" && Math.random() < 0.3) { // 30% chance
		var secondaryColor = secondaryColors[Math.floor(Math.random() * secondaryColors.length)];
		randomNose = "Isabella (Spotted " + secondaryColor + ")";
	}
	// Ears with a chance of being asymmetrical
	var randomEars = earsList[Math.floor(Math.random() * earsList.length)];
	if (randomEars === "Floppy" && Math.random() < 0.2) { // 20% chance
		randomEars = "Asymmetrical";
	}
	// head patterns
	// generate a number between 1-3
	var numberOfPatterns = Math.floor(Math.random() * 3) + 1;
	// begin random generation of (n) Head Patterns
	var randomPatterns = [];
	while (randomPatterns.length < numberOfPatterns) {
		var randomHPattern = patternsList[Math.floor(Math.random() * patternsList.length)];
		if (!randomPatterns.includes(randomHPattern)) {
			randomPatterns.push(randomHPattern);
		}
		// Sort the selected colors alphabetically
		randomPatterns.sort();
	}
	hideAllDescriptions(); // Hide all descriptions initially
	// Secondary lists
	var breedPurpose = {
		"Hunting": ["Ratter", "Scenthound", "Sighthound", "Retriever", "Pointer", "Water dog"],
		"Cattle": ["Herding", "Guardian"],
		"Working": ["Attack dog", "Guard dog", "Watchdog", "War dog", "Sled dog"],
		"Companion": ["Sporting", "Lapdog", "Assistance", "Mount"]
	};
	// Append secondary selection to the correct primary selection
	if (breedPurpose[randomItem3]) {
		var secondaryPurpose = breedPurpose[randomItem3][Math.floor(Math.random() * breedPurpose[randomItem3].length)];
		randomItem3 = randomItem3 + " (" + secondaryPurpose + ")";
	}
	// Extract only the primary purpose (e.g., "Hunting" from "Hunting (Ratter)")
	var primaryPurpose = randomItem3.split(' ')[0];
	// Display the results
	document.getElementById("list1").textContent = randomItem1;
	document.getElementById("list2").textContent = randomItem2;
	document.getElementById("list3").textContent = randomItem3;
	document.getElementById("headType").textContent = randomFace;
	document.getElementById("headEyes").textContent = randomEyes;
	// Construct the description IDs for the nose (both primary and secondary)
	var primaryNoseDescriptionId = 'headNoseDesc' + randomNose;
	var secondaryNoseDescriptionId = 'headNoseDescIsabellaSpotted' + secondaryColor;
	document.getElementById("headNose").textContent = randomNose;
	document.getElementById("headEars").textContent = randomEars;
	document.getElementById("coatLength").textContent = randomLength;
	document.getElementById("coatType").textContent = randomType;
	document.getElementById("coatTexture").textContent = randomTexture;
	// Show the description for each texture
	randomTexture.split(", ").forEach(function(texture) {
		var textureNameOnly = texture.split(" ")[0];
		showDescription(textureNameOnly, 'coatTextureDesc');
	});
	document.getElementById("headPatterns").textContent = randomPatterns.join(", ");
	document.getElementById("coatColors").textContent = randomColors.join(", ");
	document.getElementById("coatPattern").textContent = randomPattern;
	// Hide all previous pattern descriptions
	var allPatternDescriptions = document.querySelectorAll('.coatPatternDesc');
	allPatternDescriptions.forEach(function(desc) {
		desc.style.display = 'none';
	});
	// Show the description for each selected pattern
	selectedPatterns.forEach(function(pattern) {
		showDescription(pattern, 'coatPatternDesc');
	});
	// Show the appropriate descriptions for the selected items
	showDescription(randomItem1, 'sizeDesc');
	showDescription(randomItem2, 'bodyDesc');
	showDescription(primaryPurpose, 'purposeDesc');
	if (secondaryPurpose) {
		// Display the secondary purpose description
		showDescription(secondaryPurpose, 'secondaryPurposeDesc');
	} else {
		// Clear the secondary purpose description if there is none
		document.getElementById('secondaryPurposeDesc').textContent = '';
	}
	// Show descriptions for eye colors if heterochromia
	if (isHeterochromia) {
		const eyeColors = randomEyes.match(/\(([^)]+)\)/)[1].split('/');
		eyeColors.forEach(color => {
			showDescription(color.trim(), 'headEyesDesc');
		});
	} else {
		showDescription(randomEyes, 'headEyesDesc');
	}
	// Call showDescription for other elements
	showDescription(randomFace, 'headTypeDesc');
	showDescription(randomNose, 'headNoseDesc');
	showDescription(randomEars, 'headEarsDesc');
	showDescription(randomLength, 'coatLengthDesc');
	showDescription(randomType, 'coatTypeDesc');
	showDescription(randomTexture, 'coatTextureDesc');
	showDescription(randomPattern, 'coatPatternDesc');
	// Show the selected head patterns
	randomPatterns.forEach(function(pattern) {
		// Call showDescription for each selected pattern
		showDescription(pattern, 'headPatternsDesc');
	});
	randomColors.forEach(color => {
		showDescription(color, 'colorDesc');
	});
}