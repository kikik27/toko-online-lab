import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useFormValidation } from '../hooks/useFormValidation';
import productService from '../services/productService';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Input from '../components/Input';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';

const productSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  price: z.preprocess((val) => Number(val), z.number().min(1, 'Harga minimal 1')),
  stock: z.preprocess((val) => Number(val), z.number().min(0, 'Stok tidak boleh negatif')),
  imageUrl: z.string().url('URL gambar tidak valid'),
});

const Admin = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useFormValidation(productSchema);

  const createMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: productService.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeletingProduct(null);
    },
  });

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    reset({
      name: '',
      description: '',
      price: '',
      stock: 0,
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  const onSubmit = async (data) => {
    if (editingProduct) {
      await updateMutation.mutateAsync({ id: editingProduct._id, ...data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingProduct) {
      await deleteMutation.mutateAsync(deletingProduct._id);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending || isSubmitting;

  const columns = [
    { label: 'Nama Produk', field: 'name' },
    { label: 'Harga', field: 'price', render: (val) => `Rp ${val.toLocaleString('id-ID')}` },
    { label: 'Stok', field: 'stock', align: 'center' },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: '4px' }}>Kelola Produk</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>Tambah, edit, lihat, dan hapus produk dari katalog toko.</p>
        </div>
        <Button variant="primary" onClick={handleOpenCreateModal}>+ Tambah Produk</Button>
      </div>

      <Table
        columns={columns}
        data={products}
        keyField="_id"
        renderRowActions={(row) => (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Button
              variant="secondary"
              onClick={() => handleOpenEditModal(row)}
              style={{ padding: '5px 12px', fontSize: '13px' }}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => setDeletingProduct(row)}
              style={{ padding: '5px 12px', fontSize: '13px', color: 'var(--danger)', borderColor: 'var(--danger)' }}
            >
              Hapus
            </Button>
          </div>
        )}
      />

      {/* Modal Tambah / Edit Produk */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: '12px' }}>
          <Input 
            label="Nama Produk" 
            required 
            placeholder="Contoh: Kopi Arabika Gayo" 
            {...register('name')} 
            error={errors.name} 
          />
          <Input 
            label="Deskripsi Produk" 
            required 
            type="textarea" 
            placeholder="Deskripsi aroma, proses, dan karakter kopi..." 
            rows={3} 
            {...register('description')} 
            error={errors.description} 
          />
          <Input 
            label="Harga (Rp)" 
            required 
            type="number" 
            placeholder="Contoh: 85000" 
            {...register('price')} 
            error={errors.price} 
          />
          <Input 
            label="Stok Produk" 
            required 
            type="number" 
            placeholder="Contoh: 20" 
            {...register('stock')} 
            error={errors.stock} 
          />
          <Input 
            label="URL Gambar Produk" 
            required 
            placeholder="https://images.unsplash.com/..." 
            {...register('imageUrl')} 
            error={errors.imageUrl} 
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>Batal</Button>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending 
                ? (editingProduct ? 'Memperbarui...' : 'Menyimpan...') 
                : (editingProduct ? 'Perbarui' : 'Simpan')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Konfirmasi Hapus Produk */}
      <ConfirmModal
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus Produk"
        message={
          deletingProduct 
            ? `Apakah Anda yakin ingin menghapus produk "${deletingProduct.name}"? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.` 
            : ''
        }
        confirmText="Hapus Produk"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default Admin;
