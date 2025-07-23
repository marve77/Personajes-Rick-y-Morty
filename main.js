function toggleCard(card) {
  const ids = ['valores', 'formacion', 'tecnologias'];
  ids.forEach(id => {
    const el = document.getElementById('card-' + id);
    if (id === card) {
      el.classList.toggle('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}
