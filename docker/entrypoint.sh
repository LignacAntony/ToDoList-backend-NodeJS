#!/bin/bash

# Start SSH service
service ssh start

# Check if the public key file exists
if [ -f "$PUBLIC_KEY_FILE" ]; then
    # Create the .ssh directory if it doesn't exist
    mkdir -p /home/deployer/.ssh
    
    # Copy the public key to the authorized_keys file
    cat $PUBLIC_KEY_FILE > /home/deployer/.ssh/authorized_keys
    
    # Set the correct permissions
    chmod 700 /home/deployer/.ssh
    chmod 600 /home/deployer/.ssh/authorized_keys
    chown -R deployer:deployer /home/deployer/.ssh
fi

# Execute the command passed to docker run
exec "$@"
