# otimizar_fotos.ps1
Get-ChildItem -Path "." -Recurse -Include *.jpg, *.jpeg, *.png | ForEach-Object {
    $out = $_.FullName -replace '\.[^.]*$', '.webp'
    Write-Host "Compactando imagem: $($_.Name)" -ForegroundColor Cyan
    
    # Processa com ImageMagick
    magick $_.FullName -quality 80 $out
    
    # Se a conversão deu certo, remove o original
    if ($LASTEXITCODE -eq 0 -and (Test-Path -Path $out)) {
        Remove-Item -Path $_.FullName -Force
        Write-Host "✓ Original removido: $($_.Name)" -ForegroundColor Green
    } else {
        Write-Host "✗ Erro ao processar: $($_.Name)" -ForegroundColor Red
    }
}