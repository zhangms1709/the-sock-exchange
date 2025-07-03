from datetime import datetime

def generate_socks(*args, **kwargs):
    # Define the sock template
    default_template = {
        "sockDetails": {
        "size": "Large",
        "color": "Yellow",
        "pattern": "Plain",
        "material": "Bamboo",
        "condition": "Used",
        "forFoot": "Both"
        },
        "additionalFeatures": {
        "waterResistant": False,
        "padded": False,
        "antiBacterial": True
        }
    }
    # Create a list of three socks based on the template
    for key in kwargs:
        if key in default_template:
            default_template[key].update(kwargs[key])
    # Create a list of socks based on the updated template
    socks = []
    for _ in range(args[0]):
        sock = default_template.copy()
        sock['addedTimestamp'] = datetime.now().isoformat()
        socks.append(sock)
    return socks
# Example usage
custom_socks = generate_socks(3, sockDetails={'color': 'Red'},
additionalFeatures={'waterResistant': True})
print(custom_socks)