const fs = require('fs');
const path = require('path');

// On définit le chemin du fichier où les notes seront stockées
const notesFilePath = path.join(__dirname, 'notes.txt');

// Fonction pour ajouter une note
function addNote() {
    // Récupérer la valeur de la note entrée par l'utilisateur
    const noteInput = document.getElementById('note');
    const note = noteInput.value.trim();

    if (note) {
        // Écrire la note dans le fichier, chaque note est ajoutée sur une nouvelle ligne
        fs.appendFile(notesFilePath, note + '\n', (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture de la note :', err);
            } else {
                // Ajouter la note à la liste affichée
                appendNoteToList(note);
                // Réinitialiser le champ de saisie
                noteInput.value = '';
            }
        });
    }
}

// Fonction pour afficher une note dans la liste
function appendNoteToList(note) {
    const notesList = document.getElementById('notes-list');
    const li = document.createElement('li');
    li.textContent = note;
    // Ajouter un bouton de suppression pour chaque note
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => deleteNoteFromList(note, li);
    li.appendChild(deleteButton);
    notesList.appendChild(li);
}

// Fonction pour lire les notes depuis le fichier et les afficher
function loadNotes() {
    fs.readFile(notesFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture des notes :', err);
        } else {
            const notes = data.split('\n').filter(note => note.trim() !== '');
            notes.forEach(note => appendNoteToList(note));
        }
    });
}

// Fonction pour supprimer une note du fichier et de la liste affichée
function deleteNoteFromList(note, listItem) {
    fs.readFile(notesFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture des notes :', err);
        } else {
            // Filtrer la note à supprimer
            const notes = data.split('\n').filter(n => n.trim() !== note);
            fs.writeFile(notesFilePath, notes.join('\n'), (err) => {
                if (err) {
                    console.error('Erreur lors de la suppression de la note :', err);
                } else {
                    // Supprimer l'élément de la liste
                    listItem.remove();
                }
            });
        }
    });
}

// Ajouter un écouteur d'événement pour le formulaire de note
document.getElementById('note-form').addEventListener('submit', (event) => {
    event.preventDefault();
    addNote();
});

// Charger les notes au démarrage
window.onload = loadNotes;
