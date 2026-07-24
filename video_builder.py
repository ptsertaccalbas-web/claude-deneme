import os
from moviepy.editor import VideoFileClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

def render_b2b_demo(video_files, voice_file, bg_music_file=None, output_filename="Fulya_Dis_B2B_Demo.mp4"):
    print("🎬 Dosyalar kontrol ediliyor...")
    
    # 1. Eksik Dosya Kontrolü
    all_required_files = video_files + [voice_file]
    if bg_music_file and os.path.exists(bg_music_file):
        all_required_files.append(bg_music_file)
        has_bg_music = True
    else:
        has_bg_music = False
        print("⚠️ Arka plan fon müziği bulunamadı, sadece dış ses ile devam ediliyor.")

    missing_files = [f for f in video_files + [voice_file] if not os.path.exists(f)]
    
    if missing_files:
        print("\n❌ HATA: Şu dosyalar klasörde bulunamadı:")
        for mf in missing_files:
            print(f"   - {mf}")
        print("\nLütfen dosyaları 'claude-deneme' klasörüne atıp isimlerini yukarıdaki gibi değiştirin.")
        return

    print("✅ Tüm dosyalar bulundu. Video montajı başlatılıyor...")
    
    # 2. Klipleri Yükle ve Birleştir
    clips = [VideoFileClip(f) for f in video_files]
    final_clip = concatenate_videoclips(clips, method="compose")
    
    # 3. Ses Katmanlarını Hazırla
    voice = AudioFileClip(voice_file)
    
    audio_list = [voice]
    if has_bg_music:
        bg_music = AudioFileClip(bg_music_file).volumex(0.15).subclip(0, min(final_clip.duration, AudioFileClip(bg_music_file).duration))
        audio_list.append(bg_music)
    
    final_audio = CompositeAudioClip(audio_list)
    final_clip = final_clip.set_audio(final_audio)
    
    # 4. Final Render
    final_clip.write_videofile(
        output_filename,
        fps=30,
        codec="libx264",
        audio_codec="aac",
        preset="ultrafast"
    )
    print(f"\n🚀 B2B Demo Başarıyla Oluşturuldu: {output_filename}")

if __name__ == "__main__":
    sahneler = ["sahne1.mp4", "sahne2.mp4", "sahne3.mp4"]
    dis_ses = "fulya_ses.mp3"
    fon_muzigi = "fon_muzigi.mp3" # Fon müziği yoksa dosya olmasa da kod artık çökmez.
    
    render_b2b_demo(sahneler, dis_ses, fon_muzigi)