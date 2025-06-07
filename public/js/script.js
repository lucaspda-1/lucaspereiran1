document.addEventListener('DOMContentLoaded', function() {
  // Fechar mensagens de alerta após 5 segundos
  setTimeout(() => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);
});