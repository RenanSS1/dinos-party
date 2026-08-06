# otimizar_videos.ps1
Get-ChildItem -Path "." -Recurse -Include *.mp4, *.mov, *.avi, *.mkv | ForEach-Object {
    # Gera um nome de arquivo temporário para evitar conflitos
    $tempOut = $_.FullName -replace '\.[^.]*$', '.tmp_hevc.mp4'
    $finalOut = $_.FullName -replace '\.[^.]*$', '.mp4'
    
    Write-Host "Compactando vídeo: $($_.Name)" -ForegroundColor Cyan
    
    # Processa com FFmpeg (HEVC/H.265 CRF 28)
    ffmpeg -i $_.FullName -vcodec libx265 -crf 28 -acodec copy $tempOut -y -loglevel error
    
    # Se a conversão deu certo
    if ($LASTEXITCODE -eq 0 -and (Test-Path -Path $tempOut)) {
        # Se o original não for .mp4, deleta o original e renomeia o temp
        if ($_.FullName -ne $finalOut) {
            Remove-Item -Path $_.FullName -Force
        }
        # Sobrescreve/Renomeia o arquivo temporário para o nome final .mp4
        Move-Item -Path $tempOut -Destination $finalOut -Force
        Write-Host "✓ Convertido e original substituído: $($_.Name)" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao processar vídeo: $($_.Name)" -ForegroundColor Red
        if (Test-Path -Path $tempOut) { Remove-Item -Path $tempOut -Force }
    }
}