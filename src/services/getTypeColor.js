const typeColor = {
  "Ransomware": "rgb(200, 0, 0)",
  "Malware": "rgb(220, 60, 60)",
  "Code Injection": "rgb(160, 32, 240)",
  "Unknown": "rgb(160, 160, 160)",
  "Hack and leak operations": "rgb(120, 0, 80)",
  "Identity-based": "rgb(0, 120, 200)",
  "Spoofing": "rgb(0, 180, 170)",
  "Social engineering": "rgb(255, 140, 0)",
  "DDoS": "rgb(255, 70, 0)",
  "Supply chain": "rgb(90, 90, 90)",
  "IoT-based": "rgb(0, 170, 90)"
}


export function findTypeColor (type) {
  console.log(typeColor[type])
  return typeColor[type]
}