import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import Background from '../../assets/Background';

export default function AlisverisListesi() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  // Yeni not ekleme işlevi
  const addNote = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNewNote('');
      setModalVisible(false); // Not ekledikten sonra modalı kapat
    }
  };

  // Not düzenleme işlevi
  const editNote = () => {
    if (selectedNoteIndex !== null && newNote.trim() !== '') {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = newNote;
      setNotes(updatedNotes);
      setNewNote('');
      setModalVisible(false); // Notu düzenledikten sonra modalı kapat
    }
  };

  return (
    <View style={styles.container}>
      <Background>
        <View style={[styles.noteList, { marginTop: 100, opacity: 0.6 }]}>
          {notes.map((note, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedNoteIndex(index);
                setNewNote(note);
                setModalVisible(true);
              }}
            >
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{note}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Background>

      {/* Ekleme butonu */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedNoteIndex(null);
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                value={newNote}
                onChangeText={text => setNewNote(text)}
                placeholder="Yeni not ekleyin"
                multiline={true} // Çok satırlı giriş alanı
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={selectedNoteIndex === null ? addNote : editNote}
              >
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteList: {
    flex: 1,
  },
  noteContainer: {
    padding: 10,
    height: 200,
    width: 300,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 50,
  },
  noteText: {
    fontSize: 16,
    color: 'black',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: '#006A42',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 300,
    width: 310,
    borderRadius: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#006A42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});