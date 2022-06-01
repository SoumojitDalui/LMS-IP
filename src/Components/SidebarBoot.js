import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

function SidebarBoot() {
  const [show, setShow] = useState(false);  
  const closeSidebar = () => setShow(false);  
  const showSidebar = () => setShow(true);

  const navigate = useNavigate();

  const goPage = (label) => {
    if(localStorage.getItem('role') !== label && window.location.pathname !== '/check') {
      localStorage.setItem('nav', label);
      navigate('../check');
    }
    else if (window.location.pathname === '/check' && localStorage.getItem('role') !== label) {
      localStorage.setItem('nav', label);
      window.location.reload();
    }
    else if (window.location.pathname === '/check' && localStorage.getItem('role') === label) {
      if(localStorage.getItem('role') === 'Manager 1') {
        navigate('../mnger');
      }
      else if(localStorage.getItem('role') === 'Employee 1') {
        navigate('../emp');
      }
    }
  }

  return (
    <>
      <Button type="button" onClick={showSidebar}>
        <MenuIcon />
      </Button>
      <Offcanvas show={show} onHide={closeSidebar}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title>Company Hierarchy:</Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          expanded={['1','2','3','6']}
        >
          <TreeItem nodeId="1" label="CEO" onClick={ () => goPage("CEO")}>
            <TreeItem nodeId="2" label="MD" onClick={ () => goPage("MD")}>
              <TreeItem nodeId="3" label="Manager 1" onClick={ () => goPage("Manager 1")}>
                <TreeItem nodeId="4" label="Employee 1" onClick={ () => goPage("Employee 1")} />
                <TreeItem nodeId="5" label="Employee 2" onClick={ () => goPage("Employee 2")} />
              </TreeItem>
              <TreeItem nodeId="6" label="Manager 2" onClick={ () => goPage("Manager 2")}>
                <TreeItem nodeId="7" label="Employee 1" onClick={ () => goPage("Employee 1")} />
                <TreeItem nodeId="8" label="Employee 2" onClick={ () => goPage("Employee 2")} />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
        </Offcanvas.Body>  
      </Offcanvas>
    </>  
  )
}

export default SidebarBoot