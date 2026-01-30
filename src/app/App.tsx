import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Edit, Check, Trash2, Camera, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';
import icon from "@/assets/logo.ico"

interface MenuItem {
  n: string; // name
  d: string; // description
  p: string; // price
  i: string; // image (base64 or URL)
}

interface MenuCategory {
  cat: string;
  items: MenuItem[];
}

export default function App() {
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Barchasi');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-d6069679`;

  // Fetch menu data
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${serverUrl}/menu`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu');
      }
      
      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Menyu yuklanmadi. Iltimos qayta urinib ko\'ring.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveMenu = async () => {
    try {
      const response = await fetch(`${serverUrl}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(menuData),
      });

      if (!response.ok) {
        throw new Error('Failed to save menu');
      }

      toast.success('Menyu muvaffaqiyatli saqlandi!');
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving menu:', error);
      toast.error('Saqlashda xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  };

  const updateItem = (catIdx: number, itemIdx: number, field: keyof MenuItem, value: string) => {
    const newData = [...menuData];
    newData[catIdx].items[itemIdx][field] = value;
    setMenuData(newData);
  };

  const addItem = (catIdx: number) => {
    const newData = [...menuData];
    newData[catIdx].items.push({
      n: 'Yangi taom',
      d: 'Taom tarkibi',
      p: '0 so\'m',
      i: '',
    });
    setMenuData(newData);
  };

  const deleteItem = (catIdx: number, itemIdx: number) => {
    if (confirm("Bu taomni o'chirmoqchimisiz?")) {
      const newData = [...menuData];
      newData[catIdx].items.splice(itemIdx, 1);
      setMenuData(newData);
    }
  };

  const handleImageUpload = (catIdx: number, itemIdx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedImage = canvas.toDataURL('image/jpeg', 0.6);
        updateItem(catIdx, itemIdx, 'i', compressedImage);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAdminButton = () => {
    if (isEditMode) {
      saveMenu();
    }
  };

  const handleAdminPress = () => {
    if (!isEditMode) {
      const timer = setTimeout(() => {
        const password = prompt('Admin parolini kiriting:');
        if (password === 'superadmin') {
          setIsEditMode(true);
          toast.success('Admin rejimi yoqildi');
        } else if (password) {
          toast.error('Noto\'g\'ri parol');
        }
      }, 1000);
      setPressTimer(timer);
    }
  };

  const handleAdminRelease = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const getFilteredCategories = () => {
    if (activeTab === 'Barchasi') {
      return menuData;
    }
    return menuData.filter(cat => cat.cat === activeTab);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#2b1d0e' }}>
        <p style={{ color: '#c5a059' }}>Menyu yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#f8f5f0', fontFamily: 'Montserrat, sans-serif' }}>
      <Toaster />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-[5%] py-4" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <img src={logoImage} alt="OQTOSH Logo" style={{ height: 50, width: 'auto' }} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="flex flex-col items-center justify-center text-center"
        style={{ 
          height: '70vh',
          marginTop: '70px',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a3a2e 50%, #0a0a0a 100%)',
          position: 'relative',
        }}
      >
        <img src={logoImage} alt="Oqtosh Logo" style={{ maxWidth: 400, width: '90%', filter: 'drop-shadow(0 0 30px rgba(197, 160, 89, 0.3))' }} />
      </div>

      {/* Menu Section */}
      <section className="px-[5%] py-10" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f1f19 50%, #0a0a0a 100%)' }}>
        <div className="text-center mb-10">
          <h2 className="flex items-center justify-center gap-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#d4af37', textTransform: 'uppercase' }}>
            <img src={logoImage} alt="Logo" style={{ height: 50, opacity: 0.9 }} />
            Bizning Menyu
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveTab('Barchasi')}
            className="px-6 py-2 rounded-full text-sm whitespace-nowrap transition-all"
            style={{
              border: '1px solid #d4af37',
              background: activeTab === 'Barchasi' ? 'linear-gradient(135deg, #d4af37 0%, #aa8b2e 100%)' : 'transparent',
              color: activeTab === 'Barchasi' ? '#0a0a0a' : '#f8f5f0',
              fontWeight: activeTab === 'Barchasi' ? 'bold' : 'normal',
              textTransform: 'uppercase',
            }}
          >
            Barchasi
          </button>
          {menuData.map((category) => (
            <button
              key={category.cat}
              onClick={() => setActiveTab(category.cat)}
              className="px-6 py-2 rounded-full text-sm whitespace-nowrap transition-all"
              style={{
                border: '1px solid #d4af37',
                background: activeTab === category.cat ? 'linear-gradient(135deg, #d4af37 0%, #aa8b2e 100%)' : 'transparent',
                color: activeTab === category.cat ? '#0a0a0a' : '#f8f5f0',
                fontWeight: activeTab === category.cat ? 'bold' : 'normal',
                textTransform: 'uppercase',
              }}
            >
              {category.cat}
            </button>
          ))}
        </div>

        {/* Categories */}
        {getFilteredCategories().map((category, catIdx) => {
          const actualCatIdx = menuData.findIndex(c => c.cat === category.cat);
          return (
            <div key={category.cat} className="mb-12">
              <div className="flex items-center mb-8">
                <h3 className="flex items-center gap-4 whitespace-nowrap mr-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#d4af37' }}>
                  <img src={logoImage} alt="" style={{ height: 35, opacity: 0.7 }} />
                  {category.cat}
                </h3>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.5) 0%, transparent 100%)' }}></div>
                {isEditMode && (
                  <button
                    onClick={() => addItem(actualCatIdx)}
                    className="ml-4 flex items-center gap-2 px-3 py-1 rounded text-xs uppercase"
                    style={{ background: 'linear-gradient(135deg, #28a745 0%, #20803a 100%)', color: 'white', border: 'none' }}
                  >
                    <Plus size={14} /> Qo'shish
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex gap-4 p-4 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(26, 58, 46, 0.3) 0%, rgba(15, 31, 25, 0.3) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div className="relative" style={{ width: 90, height: 90, flexShrink: 0 }}>
                      <img
                        src={item.i || 'https://via.placeholder.com/150?text=OQTOSH'}
                        alt={item.n}
                        className="w-full h-full rounded-xl object-cover"
                        style={{ background: '#0a0a0a', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                      />
                      {isEditMode && (
                        <>
                          <input
                            type="file"
                            id={`img-${actualCatIdx}-${itemIdx}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(actualCatIdx, itemIdx, e)}
                          />
                          <label
                            htmlFor={`img-${actualCatIdx}-${itemIdx}`}
                            className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full cursor-pointer"
                            style={{
                              background: 'linear-gradient(135deg, #d4af37 0%, #aa8b2e 100%)',
                              color: 'white',
                              width: 30,
                              height: 30,
                              border: '2px solid #0a0a0a',
                            }}
                          >
                            <Camera size={14} />
                          </label>
                        </>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h4
                          contentEditable={isEditMode}
                          suppressContentEditableWarning
                          onBlur={(e) => updateItem(actualCatIdx, itemIdx, 'n', e.currentTarget.textContent || '')}
                          className="text-lg uppercase"
                          style={{
                            color: '#fff',
                            outline: isEditMode ? '1px dashed #d4af37' : 'none',
                            background: isEditMode ? 'rgba(26, 58, 46, 0.5)' : 'transparent',
                            padding: '2px',
                          }}
                        >
                          {item.n}
                        </h4>
                        {isEditMode && (
                          <button onClick={() => deleteItem(actualCatIdx, itemIdx)} style={{ color: '#ff4d4d' }}>
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      <p
                        contentEditable={isEditMode}
                        suppressContentEditableWarning
                        onBlur={(e) => updateItem(actualCatIdx, itemIdx, 'd', e.currentTarget.textContent || '')}
                        className="text-sm italic mt-1"
                        style={{
                          color: '#a9a9a9',
                          outline: isEditMode ? '1px dashed #d4af37' : 'none',
                          background: isEditMode ? 'rgba(26, 58, 46, 0.5)' : 'transparent',
                          padding: '2px',
                        }}
                      >
                        {item.d}
                      </p>
                      <div
                        contentEditable={isEditMode}
                        suppressContentEditableWarning
                        onBlur={(e) => updateItem(actualCatIdx, itemIdx, 'p', e.currentTarget.textContent || '')}
                        className="mt-2 font-semibold text-lg"
                        style={{
                          color: '#d4af37',
                          outline: isEditMode ? '1px dashed #d4af37' : 'none',
                          background: isEditMode ? 'rgba(26, 58, 46, 0.5)' : 'transparent',
                          padding: '2px',
                        }}
                      >
                        {item.p}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="text-center py-10 px-[5%]" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a3a2e 100%)', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="mb-5">
          <img src={logoImage} alt="OQTOSH" style={{ height: 80, opacity: 0.9, display: 'inline-block' }} />
        </div>
        <p style={{ color: '#d4af37' }}>Yakkabog' tumani, Oqtosh MFY | Tel: +998 90 444 17 71</p>
        <p style={{ marginTop: 20, opacity: 0.5, fontSize: '0.7rem' }}>&copy; 2024 OQTOSH RESTAURANT.</p>
      </footer>

      {/* Admin Controls */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {isEditMode && (
          <div
            className="px-4 py-3 rounded-lg text-sm"
            style={{
              background: 'rgba(10, 10, 10, 0.95)',
              color: 'white',
              border: '1px solid #d4af37',
            }}
          >
            <b style={{ color: '#d4af37' }}>ADMIN PANEL</b>
            <br />
            1. Tahrirlang
            <br />
            2. ✓ bosing
          </div>
        )}
        <button
          className="flex items-center justify-center rounded-full transition-all"
          style={{
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #d4af37 0%, #aa8b2e 100%)',
            color: '#0a0a0a',
            border: 'none',
            boxShadow: '0 5px 20px rgba(212, 175, 55, 0.4)',
            cursor: 'pointer',
          }}
          onClick={handleAdminButton}
          onMouseDown={handleAdminPress}
          onMouseUp={handleAdminRelease}
          onMouseLeave={handleAdminRelease}
          onTouchStart={handleAdminPress}
          onTouchEnd={handleAdminRelease}
          title={isEditMode ? 'Saqlash' : 'Admin rejimi'}
        >
          {isEditMode ? <Check size={28} /> : <Edit size={28} />}
        </button>
      </div>
    </div>
  );
}