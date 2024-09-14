$(document).ready(function() {
    const expenseTable = $('#expenseTable').DataTable();
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const loadExpenses = () => {
        expenseTable.clear();
        expenses.forEach((expense, index) => {
            expenseTable.row.add([
                expense.name,
                `$${expense.amount.toFixed(2)}`,
                expense.date,
                `<button class="edit-btn" data-id="${index}">Edit</button>
                 <button class="delete-btn" data-id="${index}">Delete</button>`
            ]).draw();
        });
    };

    loadExpenses();

    
    $('#addExpenseBtn').on('click', function() {
        $('#expenseForm')[0].reset();
        $('#expenseModal').css('display', 'flex');
        $('#expenseForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            const name = $('#expenseName').val();
            const amount = parseFloat($('#expenseAmount').val());
            const date = $('#expenseDate').val();
            const newExpense = { name, amount, date };

            expenses.push(newExpense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            loadExpenses();
            $('#expenseModal').css('display', 'none');
            Swal.fire({
                title: 'Saved!',
                text: 'Expense has been added.',
                icon: 'success',
                confirmButtonClass: 'swal2-confirm'
            });
        });
    });

  
    $('.close').on('click', function() {
        $('#expenseModal').css('display', 'none');
    });

   
    $(window).on('click', function(event) {
        if (event.target === $('#expenseModal')[0]) {
            $('#expenseModal').css('display', 'none');
        }
    });

    $('#expenseTable').on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        const row = $(this).closest('tr');
        row.fadeOut(500, function() {
            expenses.splice(id, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            loadExpenses();
            Swal.fire({
                title: 'Deleted!',
                text: 'Expense has been deleted.',
                icon: 'success',
                confirmButtonClass: 'swal2-confirm'
            });
        });
    });

   
    $('#expenseTable').on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        const expense = expenses[id];
        $('#expenseName').val(expense.name);
        $('#expenseAmount').val(expense.amount);
        $('#expenseDate').val(expense.date);
        $('#expenseModal').css('display', 'flex');

        $('#expenseForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            expense.name = $('#expenseName').val();
            expense.amount = parseFloat($('#expenseAmount').val());
            expense.date = $('#expenseDate').val();

            expenses[id] = expense; 
            localStorage.setItem('expenses', JSON.stringify(expenses));

          
            const row = expenseTable.row($(`button[data-id="${id}"]`).closest('tr'));
            row.data([
                expense.name,
                `$${expense.amount.toFixed(2)}`,
                expense.date,
                `<button class="edit-btn" data-id="${id}">Edit</button>
                 <button class="delete-btn" data-id="${id}">Delete</button>`
            ]).draw(false);

            $('#expenseModal').css('display', 'none');
            Swal.fire({
                title: 'Updated!',
                text: 'Expense has been updated.',
                icon: 'success',
                confirmButtonClass: 'swal2-confirm'
            });
        });
    });
});
