            function initTableSorting() {
                document.querySelectorAll('th[data-sortable="true"]').forEach(th => {
                    th.addEventListener('click', () => {
                        const table = th.closest('table');
                        const tbody = table.querySelector('tbody');
                        const rows = Array.from(tbody.querySelectorAll('tr'));
                        const index = Array.from(th.parentNode.children).indexOf(th);
                        const isAsc = th.classList.contains('asc');
                        
                        // Clear other headers
                        table.querySelectorAll('th').forEach(h => h.classList.remove('asc', 'desc'));
                        
                        // Toggle sort
                        th.classList.toggle('asc', !isAsc);
                        th.classList.toggle('desc', isAsc);
                        
                        const direction = !isAsc ? 1 : -1;
                        
                        rows.sort((a, b) => {
                            // Try to get data-sort attribute first (for dates/custom values)
                            const aCol = a.children[index];
                            const bCol = b.children[index];
                            let aVal = aCol.getAttribute('data-sort') || aCol.innerText.trim();
                            let bVal = bCol.getAttribute('data-sort') || bCol.innerText.trim();
                            
                            // Check if values are numbers (currency or plain numbers)
                            const aNum = parseFloat(aVal.replace(/[^0-9.-]+/g, ''));
                            const bNum = parseFloat(bVal.replace(/[^0-9.-]+/g, ''));
                            
                            if (!isNaN(aNum) && !isNaN(bNum) && !aVal.includes('-') && !bVal.includes('-')) {
                                return (aNum - bNum) * direction;
                            }
                            
                            // Date sorting
                            const aDate = new Date(aVal);
                            const bDate = new Date(bVal);
                            if (!isNaN(aDate) && !isNaN(bDate)) {
                                return (aDate - bDate) * direction;
                            }
                            
                            // String sorting
                            return aVal.localeCompare(bVal) * direction;
                        });
                        
                        tbody.append(...rows);
                    });
                });
            }
