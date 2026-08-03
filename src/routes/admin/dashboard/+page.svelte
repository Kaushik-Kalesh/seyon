<script lang="ts">
  import { fade } from 'svelte/transition';
  let { data } = $props();
  
  let industries = $state(data.industries);
  let valves = $state(data.valves);
  
  let activeTab = $state('valves');
  let isSaving = $state(false);
  
  async function saveAll() {
    isSaving = true;
    try {
      const res = await fetch('/api/save-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industries, valves })
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      alert('All changes saved successfully!');
    } catch (e: any) {
      alert('Failed to save changes: ' + e.message);
    } finally {
      isSaving = false;
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
        <button class="px-5 py-2 rounded-lg text-sm font-medium transition-colors {activeTab === 'valves' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'valves'}>
          💼 Portfolio
        </button>
        <button class="px-5 py-2 rounded-lg text-sm font-medium transition-colors {activeTab === 'industries' ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:text-white'}" onclick={() => activeTab = 'industries'}>
          📝 Industries
        </button>
      </div>
    </div>
    
    <div class="flex items-center gap-5">
      <a href="/" target="_blank" class="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        View Live Site
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
  
  <!-- Main Content Area -->
  <main class="flex-grow p-8 max-w-7xl mx-auto w-full">
    {#if activeTab === 'valves'}
      <div in:fade={{duration: 250, delay: 50}}>
        <div class="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 class="text-3xl font-bold text-dark">Valve Portfolio Manager</h2>
            <p class="text-dark-gray mt-1">Manage technical specifications, descriptions, and PDFs for your products.</p>
          </div>
          <button class="text-primary font-bold hover:text-primary-hover hover:underline decoration-2 underline-offset-4 flex items-center gap-1 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Add New Valve
          </button>
        </div>
        
        <div class="grid gap-8">
          {#each valves as valve}
            <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 transition-all hover:border-gray-300 relative overflow-hidden group">
              <!-- Delete button appearing on hover -->
              <button class="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all" title="Delete Valve">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>

              <div class="flex flex-col md:flex-row gap-8">
                <div class="w-full md:w-48 h-48 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-200 relative group/img cursor-pointer">
                  <img src={valve.imageUrl} alt={valve.name} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span class="text-white text-sm font-semibold flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                      Update Image
                    </span>
                  </div>
                </div>
                
                <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div class="md:col-span-2">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Valve Name</label>
                    <input bind:value={valve.name} class="w-full px-4 py-2.5 text-lg font-semibold bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                    <textarea bind:value={valve.description} rows="2" class="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none leading-relaxed"></textarea>
                  </div>
                  
                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Industry Assignment</label>
                    <select bind:value={valve.industrySlug} class="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none font-medium">
                      {#each industries as ind}
                        <option value={ind.slug}>{ind.name}</option>
                      {/each}
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Size Range</label>
                    <input bind:value={valve.size} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Materials</label>
                    <input bind:value={valve.material} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Pressure Rating</label>
                    <input bind:value={valve.pressureRating} class="w-full px-4 py-2.5 font-medium bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  
                  <div class="md:col-span-2 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 class="font-bold text-dark flex items-center gap-2">
                        <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                        Specification PDF
                      </h4>
                      <p class="text-sm text-gray-500 mt-1">{valve.pdfUrl ? 'PDF document attached and ready for download.' : 'No specification sheet uploaded yet.'}</p>
                    </div>
                    <button class="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-dark hover:bg-gray-50 hover:border-dark transition-all shadow-sm shrink-0 flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                      {valve.pdfUrl ? 'Replace PDF' : 'Upload PDF'}
                    </button>
                  </div>
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
             <p class="text-dark-gray mt-1">Manage industry categories and their showcase images.</p>
           </div>
         </div>
         
         <div class="grid gap-8 md:grid-cols-2">
            {#each industries as industry}
              <div class="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col group">
                 <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Industry Name</label>
                 <input bind:value={industry.name} class="w-full px-4 py-2.5 text-xl font-bold bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none mb-4" />
                 
                 <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
                 <textarea bind:value={industry.description} rows="3" class="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none mb-6 resize-none leading-relaxed"></textarea>
                 
                 <div class="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 mt-auto cursor-pointer group/img">
                   <img src={industry.imageUrl} class="w-full h-full object-cover transition-transform group-hover/img:scale-105" alt={industry.name}/>
                   <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                     <span class="text-white text-sm font-semibold flex items-center gap-2">
                       <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                       Update Cover Image
                     </span>
                   </div>
                 </div>
              </div>
            {/each}
         </div>
      </div>
    {/if}
  </main>
</div>
