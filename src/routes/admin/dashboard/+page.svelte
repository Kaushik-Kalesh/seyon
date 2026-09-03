<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';
  let { data } = $props();
  
  let industries = $state(data.industries || []);
  let models = $state(data.models || []);
  let products = $state(data.products || []);
  let brands = $state(data.brands || []);
  let siteSettings = $state(data.siteSettings || {});
  
  let activeTab = $state('models');
  let isSaving = $state(false);
  
  let fileInputRef: HTMLInputElement;
  let isUploading = $state(false);
  let uploadTarget = $state<{type: 'image'|'pdf', item: any, prop?: string} | null>(null);

  function triggerUpload(type: 'image'|'pdf', item: any, prop?: string) {
    uploadTarget = { type, item, prop };
    fileInputRef.click();
  }

  let saveStatus = $state<{type: 'success' | 'error', message: string} | null>(null);

  async function handleFileUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0 || !uploadTarget) return;

    const file = input.files[0];
    isUploading = true;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', uploadTarget.type);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      
      if (!result.success) throw new Error(result.error);
      
      if (uploadTarget.type === 'pdf') {
        uploadTarget.item[uploadTarget.prop || 'pdfUrl'] = result.url;
      } else if (uploadTarget.type === 'image') {
        uploadTarget.item[uploadTarget.prop || 'imageUrl'] = result.url;
      }
      
    } catch (err: any) {
      saveStatus = { type: 'error', message: 'Upload failed: ' + err.message };
      setTimeout(() => saveStatus = null, 3000);
    } finally {
      isUploading = false;
      saveStatus = { type: 'success', message: 'Image uploaded successfully! Remember to Save.' };
      setTimeout(() => saveStatus = null, 3000);
      uploadTarget = null;
      input.value = ''; // Reset input
    }
  }
  
  let replaceSearch = $state('');
  
  // Dictionary Editor State
  let editingKey = $state<string | null>(null);
  let editValue = $state('');

  function openEditor(key: string) {
    editingKey = key;
    editValue = siteSettings[key] || '';
  }

  function saveEdit() {
    if (editingKey) {
      siteSettings[editingKey] = editValue;
      editingKey = null;
    }
  }

  async function saveAll() {
    isSaving = true;
    saveStatus = null;
    try {
      const res = await fetch('/api/save-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industries, models, products, brands, siteSettings })
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      
      saveStatus = { type: 'success', message: 'All changes saved!' };
      setTimeout(() => saveStatus = null, 3000);
    } catch (e: any) {
      saveStatus = { type: 'error', message: 'Failed to save: ' + e.message };
      setTimeout(() => saveStatus = null, 4000);
    } finally {
      isSaving = false;
    }
  }

  function addModel() {
    models = [{
      id: crypto.randomUUID(),
      slug: 'new-model-' + Date.now(),
      name: 'New Model',
      productSlug: products[0]?.slug || 'actuators',
      description: '',
      imageUrl: '',
      material: '',
      pressureRating: '',
      temperatureRange: '',
      size: '',
      pdfUrl: null
    }, ...models];
  }

  let deleteConfirmModel = $state<string | null>(null);
  function deleteModel(id: string) {
    if (deleteConfirmModel === id) {
      models = models.filter((v: any) => v.id !== id);
      deleteConfirmModel = null;
    } else {
      deleteConfirmModel = id;
      setTimeout(() => { if (deleteConfirmModel === id) deleteConfirmModel = null; }, 3000);
    }
  }

  function addProduct() {
    products = [{
      id: 'product-' + Date.now(),
      name: 'New Product',
      slug: 'new-product-' + Date.now(),
      description: '',
      url: '/products/new-product-' + Date.now(),
      subItems: []
    }, ...products];
  }

  let deleteConfirmProduct = $state<string | null>(null);
  function deleteProduct(id: string) {
    if (deleteConfirmProduct === id) {
      products = products.filter((c: any) => c.id !== id);
      deleteConfirmProduct = null;
    } else {
      deleteConfirmProduct = id;
      setTimeout(() => { if (deleteConfirmProduct === id) deleteConfirmProduct = null; }, 3000);
    }
  }


  function addIndustry() {
    industries = [...industries, {
      id: crypto.randomUUID(),
      name: 'New Industry',
      description: '',
      imageUrl: ''
    }];
  }

  let deleteConfirmIndustry = $state<string | null>(null);
  function deleteIndustry(id: string) {
    if (deleteConfirmIndustry === id) {
      industries = industries.filter((i: any) => i.id !== id);
      deleteConfirmIndustry = null;
    } else {
      deleteConfirmIndustry = id;
      setTimeout(() => { if (deleteConfirmIndustry === id) deleteConfirmIndustry = null; }, 3000);
    }
  }

  function addBrand() {
    brands = [{
      id: crypto.randomUUID(),
      imageUrl: ''
    }, ...brands];
  }

  let deleteConfirmBrand = $state<string | null>(null);
  function deleteBrand(id: string) {
    if (deleteConfirmBrand === id) {
      brands = brands.filter((b: any) => b.id !== id);
      deleteConfirmBrand = null;
    } else {
      deleteConfirmBrand = id;
      setTimeout(() => { if (deleteConfirmBrand === id) deleteConfirmBrand = null; }, 3000);
    }
  }
</script>

<svelte:head>
  <title>CMS Dashboard | Seyon</title>
</svelte:head>

<div class="min-h-screen bg-base flex flex-col font-sans">
  <!-- Top Navigation Bar -->
  <header class="bg-dark text-white p-4 px-8 flex justify-between items-center shadow-lg sticky top-0 z-50">
    <div class="flex items-center gap-6">
      <div class="font-serif text-2xl font-bold text-primary tracking-tight">Seyon CMS</div>
      <div class="flex bg-white/10 rounded-xl p-1 shadow-inner">
        <button class="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors {activeTab === 'models' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'models'}>
          Models
        </button>
        <button class="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors {activeTab === 'products' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'products'}>
          Products
        </button>
        <button class="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors {activeTab === 'brands' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'brands'}>
          Brands
        </button>
        <button class="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors {activeTab === 'industries' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'industries'}>
          Industries
        </button>
        <button class="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors {activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'settings'}>
          Site Content
        </button>
      </div>
    </div>
    
    <div class="flex items-center gap-4">
      {#if saveStatus}
        <div in:fade out:fade class="px-4 py-2 rounded-lg text-sm font-bold {saveStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
          {saveStatus.message}
        </div>
      {/if}
      <a href="/" target="_blank" class="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2 transition-colors ml-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        Live Site
      </a>
      <button onclick={saveAll} disabled={isSaving} class="bg-primary hover:bg-primary-hover px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0">
        {#if isSaving}
          <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Saving...
        {:else}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          Save All Changes
        {/if}
      </button>
    </div>
  </header>
  
  <!-- Hidden file input for uploads -->
  <input type="file" bind:this={fileInputRef} onchange={handleFileUpload} accept={uploadTarget?.type === 'pdf' ? '.pdf' : 'image/*'} class="hidden" />

  <!-- Main Content Area -->
  <main class="flex-grow p-8 max-w-7xl mx-auto w-full">
    {#if activeTab === 'models'}
      <div in:fade={{duration: 250, delay: 50}}>
        <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 class="text-3xl font-bold text-dark">Models Portfolio Manager</h2>
            <p class="text-dark-gray mt-1">Manage technical specifications, descriptions, and PDFs for your models.</p>
          </div>
          <button onclick={addModel} class="text-primary font-bold hover:text-primary-hover hover:underline decoration-2 underline-offset-4 flex items-center gap-1 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Add New Model
          </button>
        </div>
        
        <div class="grid gap-8">
          {#each models as model}
            <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 transition-all hover:border-gray-300 relative overflow-hidden group">
              <!-- Delete button appearing on hover -->
              <button onclick={() => deleteModel(model.id)} class="absolute top-4 right-4 text-sm {deleteConfirmModel === model.id ? 'bg-red-500 text-white' : 'text-red-400 hover:text-red-600 hover:bg-red-50'} px-3 py-1.5 rounded-lg transition-all z-10 font-medium">
                {deleteConfirmModel === model.id ? 'Confirm?' : 'Delete'}
              </button>

              <div class="flex flex-col md:flex-row gap-8">
                <div class="w-full md:w-48 h-48 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-200 relative group/img cursor-pointer flex items-center justify-center" onclick={() => triggerUpload('image', model)}>
                  {#if model.imageUrl}
                    <img src={model.imageUrl} alt={model.name} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" />
                  {:else}
                    <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center group-hover/img:text-primary transition-colors">
                      <svg class="w-8 h-8 mb-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span class="text-xs font-semibold">Upload Image</span>
                    </div>
                  {/if}
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                      {model.imageUrl ? 'Update Image' : 'Upload Image'}
                    </span>
                  </div>
                </div>
                
                <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div class="md:col-span-1">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Model Name</label>
                    <input bind:value={model.name} class="w-full px-4 py-2.5 text-lg font-semibold bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div class="md:col-span-1">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">URL Slug</label>
                    <input bind:value={model.slug} class="w-full px-4 py-2.5 font-medium font-mono text-sm bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                    <textarea bind:value={model.description} rows='2' class='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none leading-relaxed'></textarea>
                  </div>
                  
                    <div>
                      <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Product Assignment</label>
                      <div class="relative">
                        <select bind:value={model.productSlug} class="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none font-medium pr-10">
                          {#each products as product}
                            <option value={product.slug}>{product.name}</option>
                          {/each}
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Size Range</label>
                    <input bind:value={model.size} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Materials</label>
                    <input bind:value={model.material} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Pressure Rating</label>
                    <input bind:value={model.pressureRating} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Temperature Range</label>
                    <input bind:value={model.temperatureRange} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div class="md:col-span-2 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 class="font-bold text-dark flex items-center gap-2">
                        <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        Specification PDF
                      </h4>
                      <p class="text-sm text-gray-500 mt-1">{model.pdfUrl ? 'PDF document attached and ready for download.' : 'No specification sheet uploaded yet.'}</p>
                    </div>
                    <button onclick={() => triggerUpload('pdf', model)} class="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-dark hover:bg-gray-50 hover:border-dark transition-all shadow-sm shrink-0 flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                      {model.pdfUrl ? 'Replace PDF' : 'Upload PDF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if activeTab === 'products'}
      <div in:fade={{duration: 250, delay: 50}}>
        <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 class="text-3xl font-bold text-dark">Products Manager</h2>
            <p class="text-dark-gray mt-1">Set a Parent Product to nest it as a sub-product at <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">/products/[parent]/[slug]</code>.</p>
          </div>
          <button onclick={addProduct} class="text-primary font-bold hover:text-primary-hover hover:underline decoration-2 underline-offset-4 flex items-center gap-1 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Add Product
          </button>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          {#each products as product}
            {@const urlParts = product.url.split('/')}
            {@const isSubproduct = urlParts.length === 4}
            {@const currentParentSlug = isSubproduct ? urlParts[2] : ''}
            {@const topLevelCats = products.filter((c: any) => c.url.split('/').length === 3 && c.id !== product.id)}
            <div class="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative {isSubproduct ? 'border-l-4 border-l-primary/30' : ''}">
              <button onclick={() => deleteProduct(product.id)} class="absolute top-4 right-4 text-sm {deleteConfirmProduct === product.id ? 'bg-red-500 text-white' : 'text-red-400 hover:text-red-600 hover:bg-red-50'} px-3 py-1.5 rounded-lg transition-all font-medium">
                {deleteConfirmProduct === product.id ? 'Confirm?' : 'Delete'}
              </button>
              <div class="grid grid-cols-1 gap-4 mt-2">
                <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Product Name</label>
                  <input bind:value={product.name} oninput={() => {
                    product.slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    product.url = isSubproduct ? `/products/${currentParentSlug}/${product.slug}` : `/products/${product.slug}`;
                  }} class="w-full px-4 py-2.5 text-lg font-semibold bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Parent Product</label>
                  <div class="relative">
                    <select
                      value={currentParentSlug}
                      onchange={(e) => {
                        const parent = (e.target as HTMLSelectElement).value;
                        product.url = parent ? `/products/${parent}/${product.slug}` : `/products/${product.slug}`;
                      }}
                      class="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none font-medium pr-10"
                    >
                      <option value="">— None (top-level) —</option>
                      {#each topLevelCats as parent}
                        <option value={parent.slug}>{parent.name}</option>
                      {/each}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">URL Slug</label>
                  <div class="flex items-center bg-gray-50 border border-transparent rounded-xl focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
                    <span class="px-3 py-2.5 text-sm font-mono text-gray-400 shrink-0 border-r border-gray-200">{isSubproduct ? `/products/${currentParentSlug}/` : '/products/'}</span>
                    <input bind:value={product.slug} oninput={() => {
                      product.url = isSubproduct ? `/products/${currentParentSlug}/${product.slug}` : `/products/${product.slug}`;
                    }} class="flex-1 px-3 py-2.5 font-medium font-mono text-sm bg-transparent outline-none" />
                  </div>
                  <p class="text-xs text-gray-400 mt-1 font-mono">→ {product.url}</p>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                  <textarea bind:value={product.description} rows='2' class='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none leading-relaxed'></textarea>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if activeTab === 'industries'}
      <div in:fade={{duration: 250, delay: 50}}>
         <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
           <div>
             <h2 class="text-3xl font-bold text-dark">Industries Manager</h2>
             <p class="text-dark-gray mt-1">Manage industry products and their showcase images.</p>
           </div>
           <button onclick={addIndustry} class="text-primary font-bold hover:text-primary-hover hover:underline decoration-2 underline-offset-4 flex items-center gap-1 transition-colors">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
             Add Industry
           </button>
         </div>
         
         <div class="grid gap-8 md:grid-cols-2">
            {#each industries as industry}
              <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col group relative">
                 <button onclick={() => deleteIndustry(industry.id)} class="absolute top-4 right-4 text-sm {deleteConfirmIndustry === industry.id ? 'bg-red-500 text-white' : 'text-red-400 hover:text-red-600 hover:bg-red-50'} px-3 py-1.5 rounded-lg transition-all z-10 font-medium">
                   {deleteConfirmIndustry === industry.id ? 'Confirm?' : 'Delete'}
                 </button>
                 <div class="flex gap-4 mb-4">
                   <div class="flex-grow">
                     <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Industry Name</label>
                     <input bind:value={industry.name} class="w-full px-4 py-2.5 text-xl font-bold bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                   </div>
                   
                 </div>
                 
                 <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                 <textarea bind:value={industry.description} rows='3' class='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none mb-6 resize-none leading-relaxed'></textarea>
                 
                  <div class="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 mt-auto cursor-pointer group/img flex items-center justify-center bg-gray-50" onclick={() => triggerUpload('image', industry)}>
                    {#if industry.imageUrl}
                      <img src={industry.imageUrl} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt={industry.name}/>
                    {:else}
                      <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center group-hover/img:text-primary transition-colors">
                        <svg class="w-8 h-8 mb-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <span class="text-xs font-semibold">Upload Cover Image</span>
                      </div>
                    {/if}
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <span class="text-white text-sm font-semibold flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                        {industry.imageUrl ? 'Update Cover Image' : 'Upload Cover Image'}
                      </span>
                    </div>
                  </div>
              </div>
            {/each}
         </div>
      </div>
    {/if}

    
    {#if activeTab === 'brands'}
      <div in:fade={{duration: 250, delay: 50}}>
        <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 class="text-3xl font-bold text-dark">Brand Portfolio</h2>
            <p class="text-dark-gray mt-1">Manage the brands and manufacturers you supply.</p>
          </div>
          <button onclick={addBrand} class="text-primary font-bold hover:text-primary-hover hover:underline decoration-2 underline-offset-4 flex items-center gap-1 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Add Brand
          </button>
        </div>

        <div class="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {#each brands as brand}
            <div class="bg-white p-4 pt-12 rounded-2xl shadow-md border border-gray-100 flex flex-col group relative">
              <button onclick={() => deleteBrand(brand.id)} class="absolute top-2 right-2 text-xs {deleteConfirmBrand === brand.id ? 'bg-red-500 text-white' : 'text-red-400 hover:text-red-600 hover:bg-red-50'} px-2 py-1 rounded-lg transition-all z-10 font-medium">
                {deleteConfirmBrand === brand.id ? 'Confirm?' : 'Delete'}
              </button>

              <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 mt-auto cursor-pointer group/img flex items-center justify-center bg-gray-50" onclick={() => triggerUpload('image', brand, 'imageUrl')}>
                {#if brand.imageUrl}
                  <img src={brand.imageUrl} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt={brand.name}/>
                {:else}
                  <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center group-hover/img:text-primary transition-colors">
                    <svg class="w-8 h-8 mb-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span class="text-xs font-semibold">Upload Brand Image</span>
                  </div>
                {/if}
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span class="text-white text-sm font-semibold flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                    {brand.imageUrl ? 'Update Brand Image' : 'Upload Brand Image'}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

        {#if activeTab === 'settings'}
      <div in:fade={{duration: 250, delay: 50}}>
         <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
           <div>
             <h2 class="text-3xl font-bold text-dark">Site Content</h2>
             <p class="text-dark-gray mt-1">Manage global website texts, contact info, and branding.</p>
           </div>
         </div>
         
          <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-10">
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="text-xl font-bold text-dark">Text Content Dictionary</h3>
                <p class="text-sm text-gray-500 mt-1">Search and edit all website text content.</p>
              </div>
              <div class="relative w-72">
                <input bind:value={replaceSearch} placeholder="Search content..." class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                <svg class="w-4 h-4 text-gray-400 absolute left-4 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#if replaceSearch.trim().length > 0}
                {#each Object.keys(siteSettings).filter(k => !k.includes('Image') && (k.toLowerCase().includes(replaceSearch.toLowerCase()) || (siteSettings[k]||'').toLowerCase().includes(replaceSearch.toLowerCase()))) as key}
                  <div class="border border-gray-100 rounded-xl p-4 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer bg-gray-50 hover:bg-white group" onclick={() => openEditor(key)}>
                    <div class="text-xs font-bold text-primary mb-2 font-mono break-all">{key}</div>
                    <div class="text-sm text-dark-gray line-clamp-3 leading-relaxed">{@html siteSettings[key]}</div>
                  </div>
                {/each}
              {:else}
                <div class="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <p class="text-gray-500 font-medium">Type in the search box to find and edit text content.</p>
                </div>
              {/if}
            </div>
          </div>

          <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 max-w-5xl">
            <h3 class="text-xl font-bold text-dark mb-6">Global Images</h3>
            
            <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Home Page</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1.5">Hero Background</label>
                <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'homeHeroImage')}>
                  <img src={siteSettings.homeHeroImage} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Home Hero"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1.5">About Section</label>
                <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'homeAboutImage')}>
                  <img src={siteSettings.homeAboutImage} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Home About"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 border-t border-gray-100 pt-6">About Page</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="col-span-2 md:col-span-4">
                <label class="block text-xs font-bold text-gray-500 mb-1.5">Hero Background</label>
                <div class="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'aboutHeroImage')}>
                  <img src={siteSettings.aboutHeroImage} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="About Hero"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1.5">Grid Image 1</label>
                <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'aboutGridImage1')}>
                  <img src={siteSettings.aboutGridImage1} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Grid 1"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1.5">Grid Image 2</label>
                <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'aboutGridImage2')}>
                  <img src={siteSettings.aboutGridImage2} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Grid 2"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1.5">Grid Image 3</label>
                <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'aboutGridImage3')}>
                  <img src={siteSettings.aboutGridImage3} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Grid 3"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1.5">Grid Image 4</label>
                <div class="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 cursor-pointer group/img" onclick={() => triggerUpload('image', siteSettings, 'aboutGridImage4')}>
                  <img src={siteSettings.aboutGridImage4} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt="Grid 4"/>
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">Update</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    {/if}
  </main>
</div>

<!-- Text Edit Modal -->
{#if editingKey}
  <div class="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full" in:fade={{duration: 150}}>
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-dark">Edit Content</h3>
        <button onclick={() => editingKey = null} class="text-gray-400 hover:text-dark">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      
      <div class="mb-6">
        <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Content Key</label>
        <div class="px-4 py-2.5 font-mono text-sm bg-gray-50 rounded-xl text-primary border border-gray-100">{editingKey}</div>
      </div>

      <div class="mb-8">
        <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Value</label>
        <RichTextEditor bind:value={editValue} />
      </div>

      <div class="flex justify-end gap-3">
        <button onclick={() => editingKey = null} class="px-6 py-2.5 rounded-full font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
        <button onclick={saveEdit} class="bg-primary hover:bg-primary-hover px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5">Update Value</button>
      </div>
    </div>
  </div>
{/if}






