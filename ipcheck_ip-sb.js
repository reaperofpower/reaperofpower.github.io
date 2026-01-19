let url = "https://api.ip.sb/geoip";

$httpClient.get(url, function(error, response, data) {
  if (error) {
    body = {
Title: "Node Information",
Content: "Failed to retrieve IP address data",
Icon: "exclamationmark.triangle.fill",
BackgroundColor: '#FF9500'
    };
    $done(body);
    return;
  }

  let jsonData = JSON.parse(data);


let country = jsonData.country || "Unknown country";
let countryCode = jsonData.country_code || "";
let emoji = getFlagEmoji(countryCode);
let city = jsonData.city || jsonData.region || "Unknown city";
let isp = jsonData.organization || "Unknown provider";
let ip = jsonData.ip || "Unknown IP";

  body = {
    title: "VPN",
    content: `${ip}\n${isp}\n${emoji}${country} - ${city}`,
    icon: "network.badge.shield.half.filled",
    backgroundColor: '#0C9DFA'
  };

  $done(body);
});

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  if (countryCode.toUpperCase() === 'TW') {
    countryCode = 'CN';
  }
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
