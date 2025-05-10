document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // In a real implementation, this would validate credentials against a server
            if (username === 'admin' && password === 'password') {
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password. For demo, use: admin/password');
            }
        });
    }
    
    // Toggle Sidebar
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('full-width');
        });
    }
    
    // Image Upload Modal
    const uploadImagesBtn = document.getElementById('uploadImagesBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelUpload = document.getElementById('cancelUpload');
    const confirmUpload = document.getElementById('confirmUpload');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadPreview = document.getElementById('uploadPreview');
    
    if (uploadImagesBtn && uploadModal) {
        uploadImagesBtn.addEventListener('click', function() {
            uploadModal.classList.add('active');
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                uploadModal.classList.remove('active');
            });
        }
        
        if (cancelUpload) {
            cancelUpload.addEventListener('click', function() {
                uploadModal.classList.remove('active');
                // Clear previeww
                if (uploadPreview) {
                    uploadPreview.innerHTML = '';
                }
            });
        }
        
        if (confirmUpload) {
            confirmUpload.addEventListener('click', function() {
                // In a real implementation, this would upload the images to a server
                alert('Images would be uploaded in a real implementation.');
                uploadModal.classList.remove('active');
                // Clear preview
                if (uploadPreview) {
                    uploadPreview.innerHTML = '';
                }
            });
        }
        
        // Drag and drop functionality
        if (uploadArea) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                uploadArea.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight() {
                uploadArea.classList.add('dragover');
            }
            
            function unhighlight() {
                uploadArea.classList.remove('dragover');
            }
            
            uploadArea.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                handleFiles(files);
            }
        }
        
        // File input change
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                handleFiles(this.files);
            });
        }
        
        function handleFiles(files) {
            if (!uploadPreview) return;
            
            uploadPreview.innerHTML = '';
            
            for (let i = 0; i < files.length; i++) {
                if (!files[i].type.match('image.*')) continue;
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    
                    const removeBtn = document.createElement('span');
                    removeBtn.className = 'remove-preview';
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.addEventListener('click', function() {
                        previewItem.remove();
                    });
                    
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                    uploadPreview.appendChild(previewItem);
                };
                
                reader.readAsDataURL(files[i]);
            }
        }
    }
    
    // PDF Upload Modal
    const uploadPdfBtn = document.getElementById('uploadPdfBtn');
    const uploadPdfModal = document.getElementById('uploadPdfModal');
    const cancelPdfUpload = document.getElementById('cancelPdfUpload');
    const confirmPdfUpload = document.getElementById('confirmPdfUpload');
    const pdfUploadArea = document.getElementById('pdfUploadArea');
    const pdfFileInput = document.getElementById('pdfFileInput');
    const pdfUploadPreview = document.getElementById('pdfUploadPreview');
    
    if (uploadPdfBtn && uploadPdfModal) {
        uploadPdfBtn.addEventListener('click', function() {
            uploadPdfModal.classList.add('active');
        });
        
        const closePdfModal = uploadPdfModal.querySelector('.close-modal');
        if (closePdfModal) {
            closePdfModal.addEventListener('click', function() {
                uploadPdfModal.classList.remove('active');
            });
        }
        
        if (cancelPdfUpload) {
            cancelPdfUpload.addEventListener('click', function() {
                uploadPdfModal.classList.remove('active');
                // Clear preview
                if (pdfUploadPreview) {
                    pdfUploadPreview.innerHTML = '';
                }
            });
        }
        
        if (confirmPdfUpload) {
            confirmPdfUpload.addEventListener('click', function() {
                // In a real implementation, this would upload the PDF to a server
                alert('PDF would be uploaded in a real implementation.');
                uploadPdfModal.classList.remove('active');
                // Clear preview
                if (pdfUploadPreview) {
                    pdfUploadPreview.innerHTML = '';
                }
            });
        }
        
        // Drag and drop functionality for PDF
        if (pdfUploadArea) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                pdfUploadArea.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                pdfUploadArea.addEventListener(eventName, highlightPdf, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                pdfUploadArea.addEventListener(eventName, unhighlightPdf, false);
            });
            
            function highlightPdf() {
                pdfUploadArea.classList.add('dragover');
            }
            
            function unhighlightPdf() {
                pdfUploadArea.classList.remove('dragover');
            }
            
            pdfUploadArea.addEventListener('drop', handlePdfDrop, false);
            
            function handlePdfDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                handlePdfFiles(files);
            }
        }
        
        // File input change for PDF
        if (pdfFileInput) {
            pdfFileInput.addEventListener('change', function() {
                handlePdfFiles(this.files);
            });
        }
        
        function handlePdfFiles(files) {
            if (!pdfUploadPreview) return;
            
            pdfUploadPreview.innerHTML = '';
            
            for (let i = 0; i < files.length; i++) {
                if (files[i].type !== 'application/pdf') {
                    alert('Please select a PDF file.');
                    return;
                }
                
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item pdf-preview-item';
                
                const fileName = document.createElement('p');
                fileName.textContent = files[i].name;
                
                const fileSize = document.createElement('p');
                fileSize.textContent = formatFileSize(files[i].size);
                
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-preview';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.addEventListener('click', function() {
                    previewItem.remove();
                    pdfFileInput.value = '';
                });
                
                previewItem.appendChild(fileName);
                previewItem.appendChild(fileSize);
                previewItem.appendChild(removeBtn);
                pdfUploadPreview.appendChild(previewItem);
                
                // Only process the first file for simplicity
                break;
            }
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }
    
    // Image Actions
    const viewImageBtns = document.querySelectorAll('.image-actions .btn-icon[title="View"]');
    const editImageBtns = document.querySelectorAll('.image-actions .btn-icon[title="Edit"]');
    const deleteImageBtns = document.querySelectorAll('.image-actions .btn-icon[title="Delete"]');
    
    viewImageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real implementation, this would open a modal with the full-size image
            alert('Image viewer would open here in a real implementation.');
        });
    });
    
    editImageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real implementation, this would open an image editor
            alert('Image editor would open here in a real implementation.');
        });
    });
    
    deleteImageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this image?')) {
                // In a real implementation, this would delete the image from the server
                const imageItem = this.closest('.image-item');
                if (imageItem) {
                    imageItem.remove();
                }
            }
        });
    });
    
    // PDF Actions
    const viewPdfBtns = document.querySelectorAll('.pdf-actions .btn-icon[title="View"]');
    const editPdfBtns = document.querySelectorAll('.pdf-actions .btn-icon[title="Edit"]');
    const downloadPdfBtns = document.querySelectorAll('.pdf-actions .btn-icon[title="Download"]');
    const deletePdfBtns = document.querySelectorAll('.pdf-actions .btn-icon[title="Delete"]');
    
    viewPdfBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real implementation, this would open a PDF viewer
            alert('PDF viewer would open here in a real implementation.');
        });
    });
    
    editPdfBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real implementation, this would open a PDF metadata editor
            alert('PDF metadata editor would open here in a real implementation.');
        });
    });
    
    downloadPdfBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real implementation, this would download the PDF
            alert('PDF would be downloaded in a real implementation.');
        });
    });
    
    deletePdfBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this PDF?')) {
                // In a real implementation, this would delete the PDF from the server
                const pdfItem = this.closest('.pdf-item');
                if (pdfItem) {
                    pdfItem.remove();
                }
            }
        });
    });
    
    // Admin Profile Dropdown
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', function() {
            // In a real implementation, this would toggle a dropdown menu
            alert('Profile dropdown would appear here in a real implementation.');
        });
    }
    
    // Pagination
    const paginationBtns = document.querySelectorAll('.pagination .btn-page');
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real implementation, this would load the corresponding page of items
            });
        });
    }
});