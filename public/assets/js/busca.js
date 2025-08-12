
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btnSearch').addEventListener('click', function(e) {
    e.preventDefault();
    this.closest('form').submit();
  });
});